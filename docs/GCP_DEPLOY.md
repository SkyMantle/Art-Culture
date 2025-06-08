# Deploying to Google Cloud Run

This guide shows how to build the Next.js application into a Docker image, store it in Google Artifact Registry and deploy the container to Cloud Run.

1. Install the [gcloud CLI](https://cloud.google.com/sdk/docs/install) and authenticate:
   ```bash
   gcloud auth login
   gcloud config set project <PROJECT_ID>
   gcloud auth configure-docker <REGION>-docker.pkg.dev
   ```
2. Build the production files:
   ```bash
   npm run build
   ```
3. Build a Docker image and tag it for Artifact Registry:
   ```bash
   docker build -t <REGION>-docker.pkg.dev/<PROJECT_ID>/art-culture/app:latest .
   ```
4. Push the image to Artifact Registry:
   ```bash
   docker push <REGION>-docker.pkg.dev/<PROJECT_ID>/art-culture/app:latest
   ```
5. Deploy the container to Cloud Run:
   ```bash
   gcloud run deploy art-culture \
     --image <REGION>-docker.pkg.dev/<PROJECT_ID>/art-culture/app:latest \
     --region <REGION> \
     --platform managed \
     --allow-unauthenticated
   ```

Replace `<PROJECT_ID>` with your Google Cloud project identifier and `<REGION>` with the desired region (for example `us-central1`).
