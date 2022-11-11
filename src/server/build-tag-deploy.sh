# =====================================
# build & tag vectopus server image
# =====================================

echo "Starting vectopus server deployment ..."
docker build -t vectopus-api .
docker tag vectopus 511873596089.dkr.ecr.us-east-1.amazonaws.com/vectopus-api
docker push 511873596089.dkr.ecr.us-east-1.amazonaws.com/vectopus-api
echo "Finished vectopus server deployment."