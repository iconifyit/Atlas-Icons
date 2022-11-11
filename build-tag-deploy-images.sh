HERE=`pwd`


# =====================================
# build & tag vectopus server image
# =====================================
cd ./src/server/
docker build -t vectopus-api .
docker tag vectopus 511873596089.dkr.ecr.us-east-1.amazonaws.com/vectopus-api
docker push 511873596089.dkr.ecr.us-east-1.amazonaws.com/vectopus-api
cd $HERE

# =====================================
# build & tag vectopus client image
# =====================================
cd ./src/client/
docker build -t vectopus .
docker tag vectopus 511873596089.dkr.ecr.us-east-1.amazonaws.com/vectopus
docker push 511873596089.dkr.ecr.us-east-1.amazonaws.com/vectopus
cd $HERE