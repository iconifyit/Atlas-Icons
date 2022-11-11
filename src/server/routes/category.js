const express = require("express");
const { Category } = require("../models/category");
const { Icon } = require("../models/icon");
const router = express.Router();
const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');
const _ = require("lodash");
var AdmZip = require("adm-zip");
const auth = require("../middleware/auth");


const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);
const TEMP_DIR = path.join(__dirname, process.env.TEMP_DIR);

router.post("/", auth, async (req, res, next) => {
    const { category, icons } = req.body;
    const categoryDir = category.name.replace(/[^A-Z0-9]+/ig, "-").toLowerCase();
    const _category = new Category({
        name: category.name,
        dir: categoryDir
    });

    const catDirPath = `${UPLOAD_DIR}${categoryDir}/`;

    if (!fs.existsSync(catDirPath)) {
        await fsPromises.mkdir(catDirPath);
    }

    try {
        await _category.save();
        if (icons.length) {
            // icons.forEach((icon) => {
            for (const icon of icons) {
                const iconFilename = `${icon.name.replace(/[^A-Z0-9]+/ig, "-").toLowerCase()}.svg`
                const iconPath = `${catDirPath}${iconFilename}`

                await fsPromises.rename(`${TEMP_DIR}${icon.filename}`, iconPath,
                    function (err) {
                        if (err) console.log(err); //res.status(200).send(err)
                    })

                const iconFile = await fsPromises.readFile(`${iconPath}`, (err) => {
                    if (err) console.log(err)
                })

                const tags = icon.tags.split(',').map(tag => tag.trim());
                const reactTaker = _.upperFirst(_.camelCase(iconFilename.replace(".svg", "")));

                icon.category = _category._id;
                icon.tags = tags;
                icon.filename = iconFilename;
                icon.reactTaker = reactTaker;
                icon.svgCode = iconFile.toString().replace(/#[0-9A-F]{6}/g, "currentColor")
            }

            // });

            Icon.insertMany(icons).then((icons) => {
                res.status(200).send({ category: _category, icons })

            }).catch((err) => {
                console.log(err)
            })
        } else {
            res.status(200).send({ category: _category })
        }
    }
    catch (err) {
        console.log(err)
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(err.statusCode).send(err);
    }
});


router.put("/", auth, async (req, res, next) => {
    const { category, icons } = req.body;

    const currentCat = await Category.findById(category._id)

    const catDirPath = `${currentCat.dir}/`;

    if (icons.length) {
        const newIcons = [];
        const existingIcons = [];
        for (const icon of icons) {

            const exFilename = `${icon.filename}`;
            const newFilename = `${icon.name.replace(/[^A-Z0-9]+/ig, "-").toLowerCase()}.svg`;
            const iconPath = `${catDirPath}${newFilename}`;

            await fsPromises.rename(`${icon._id ? UPLOAD_DIR : TEMP_DIR}${icon._id ? catDirPath : ''}${exFilename}`, `${UPLOAD_DIR}${iconPath}`,
                function (err) {
                    if (err) console.log(err) //res.status(500).send(err)
                })

            const iconFile = await fsPromises.readFile(`${UPLOAD_DIR}${iconPath}`, (err) => {
                if (err) console.log(err)
            })

            const reactTaker = _.upperFirst(_.camelCase(newFilename.replace(".svg", "")));

            let tags;

            if (typeof (icon.tags) === "string") {
                tags = icon.tags.split(',').map(tag => tag.trim());
            }

            icon.category = category._id;
            icon.tags = tags ? tags : icon.tags;
            icon.filename = newFilename;
            icon.reactTaker = reactTaker;
            icon.svgCode = iconFile.toString().replace(/#[0-9A-F]{6}/g, "currentColor");

            if (icon._id) {
                existingIcons.push(icon)
            } else {
                newIcons.push(icon)
            }
        }


        await Icon.insertMany(newIcons)

        for (const icon of existingIcons) {
            await Icon.findByIdAndUpdate({ _id: icon._id }, {
                ...icon
            })
        }

        res.status(200).send(true)
    }


})


router.put("/category-name", auth, async (req, res, next) => {
    const { category } = req.body;
    const newDir = category.name.replace(/[^A-Z0-9]+/ig, "-").toLowerCase();
    const currentCategory = await Category.findById(category._id)
    console.log("req.body: ", currentCategory)

    try {

        await fsPromises.rename(`${UPLOAD_DIR}${currentCategory.dir}`, `${UPLOAD_DIR}${newDir}`,
            function (err) {
                if (err) res.status(500).send(err)
            })
    } catch (err) {
        console.log("err: ", err)
    }

    const updatedCategory = await Category.findOneAndUpdate({ _id: category._id }, {
        name: category.name,
        dir: newDir
    }, { new: true });

    res.status(200).send(updatedCategory)
});


router.get("/categories-names", auth, async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).send({ categories });
})

router.get("/categories", async (req, res, next) => {
    const categories = await Category.aggregate([
        {
            $lookup: {
                from: "icons",
                localField: "_id",
                foreignField: "category",
                as: "icons"
            }
        }
    ]).sort("name");

    res.status(200).send(categories);
})

router.get("/filter", async (req, res, next) => {
    let query = req.query.q;
    query = query.replace(/[^A-Z0-9]+/ig, ",").toLowerCase();

    const queryArr = query.split(',').map(word => word.trim());

    const matchArr = [];
    queryArr.forEach(word => {
        matchArr.push({ name: new RegExp(word, "i") })
        matchArr.push({ tags: new RegExp(word, "i") })
    })

    const categories = await Category.aggregate([
        {

            $lookup: {
                from: "icons",
                localField: "_id",
                foreignField: "category",
                as: "icons",

                pipeline: [
                    {
                        $match: {
                            $or: matchArr,
                        }

                    }
                ]
            },

        },
    ]).sort("name");

    res.status(200).send(categories);
})

router.get("/download-all", async (req, res, next) => {

    const zip = new AdmZip();

    zip.addLocalFolder(UPLOAD_DIR);

    const zipContent = zip.toBuffer();

    const fileName = "atlas-icons.zip";
    const fileType = "application/zip";

    res.writeHead(200, {
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': fileType,
    })
    
    return res.end(zipContent);
})


router.get("/:id", auth, async (req, res, next) => {

    const category = await Category.findById(req.params.id);
    const icons = await Icon.find({ category: req.params.id }).populate("category")


    res.status(200).send({ category, icons });
})





module.exports = router;