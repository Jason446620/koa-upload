const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1} = require('uuid');
const koaBody = require('koa-body');
const mime = require('mime-types')
const fs = require('fs');

/*
 * @Description:api controller
 * @Version: 0.0.1
 * @Company: hNdt
 * @Author: xiaWang1024
 * @Date: 2020-02-21 14:08:48
 * @LastEditTime: 2020-02-21 14:21:41
 */
module.exports = {
    async getUser(ctx, next) {
        let code = 0
        let { url, query, querystring,params } = ctx
        if(!url){
            code = 1
        }
        ctx.body = {
            code:code,
            data:{url, query, querystring,params}
        }
    },
    async addUser(ctx,next){
        /**
         * ctx.request.body 
         * post 请求参数
         */
        let code = 0
        let {name} = ctx.request.body
        if(!name) {
            code = 1
        }
        ctx.body = {
            code,
            data:ctx.request.body
        }
    },
    async testApi(ctx,next){
        const AZURE_STORAGE_CONNECTION_STRING='Defau**s.net';
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        // Create a unique name for the container
        const containerName = 'flasksta';
        // Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobName = 'quickstart' + uuidv1() + '.txt';
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
        /**
         * ctx.request.body 
         * post 请求参数
         */
        let code = 0
        let {name} = ctx.request.body
        if(!name) {
            code = 1
        }
        ctx.body = {
            code,
            data: "Blob was uploaded successfully. requestId: " + uploadBlobResponse.requestId //ctx.request.body
        }
    },
    async koa(ctx,next){
        try {
            const {path, name, type} = ctx.request.files.avatar;
            const fileExtension = mime.extension(type);
            console.log(`path: ${path}`);
            console.log(`filename: ${name}`);
            console.log(`type: ${type}`);
            console.log(`fileExtension: ${fileExtension}`);
            const AZURE_STORAGE_CONNECTION_STRING='DefaultEn***t';
            const AZURE_VIDEO_STORAGE_CONTAINER='flasksta';

            const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
            const containerClient = blobServiceClient.getContainerClient(AZURE_VIDEO_STORAGE_CONTAINER);

            const blockBlobClient = containerClient.getBlockBlobClient(name);
            console.log('\nUploading to Azure storage as blob:\n\t', name);
            const uploadBlobResponse = await blockBlobClient.uploadFile(path);
            ctx.body = { body : { results : uploadBlobResponse.requestId}};
        } catch(err) {
            
            console.log(`error ${err.message}`)
            ctx.res = { body : { results : err.message}};
        }
    }
}
