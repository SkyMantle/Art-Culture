# Deploying on Google Cloud Platform

This guide explains how to build and deploy the Next.js application using **Google Cloud Run**. You will store the Docker image in **Google Container Registry**.

1. Install the [gcloud CLI](https://cloud.google.com/sdk/docs/install) and authenticate:
   ```bash
   gcloud auth login
   gcloud config set project <PROJECT_ID>
   gcloud auth configure-docker
   ```
2. Build the production files:
   ```bash
   npm run build
   ```
3. Build a Docker image and tag it for Container Registry:
   ```bash
   docker build -t gcr.io/<PROJECT_ID>/art-culture:latest .
   ```
4. Push the image to Container Registry:
   ```bash
   docker push gcr.io/<PROJECT_ID>/art-culture:latest
   ```
5. Deploy the container to Cloud Run:
   ```bash
   gcloud run deploy art-culture \
     --image gcr.io/<PROJECT_ID>/art-culture:latest \
     --platform managed \
     --region <REGION> \
     --allow-unauthenticated
   ```

Replace `<PROJECT_ID>` with your Google Cloud project identifier and `<REGION>` with the region where you want the service to run.
