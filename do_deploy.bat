@echo off
echo Starting Vercel deployment > deploy_log.txt
call npx vercel --prod --yes >> deploy_log.txt 2>&1
echo Deployment script finished. >> deploy_log.txt
