# =====================================
# build & tag vectopus client image
# =====================================

echo "Starting vectopus client deployment ..."
docker build -t vectopus .
docker tag vectopus 511873596089.dkr.ecr.us-east-1.amazonaws.com/vectopus
docker push 511873596089.dkr.ecr.us-east-1.amazonaws.com/vectopus
echo "Finished vectopus client deployment."