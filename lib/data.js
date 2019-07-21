/*
 * Library for storing and editing data
 *
 * @TODO Refactor to avoid callback hell
 */

 // Dependencies
 const fs = require('fs')
 const path = require('path')

 const lib = {
     basePath: path.join(__dirname + '/../.data/'),
     // Create a new file to write data to
     create(dir,file,data,callback) {
        fs.open(this.basePath + dir + '/' + file + '.json', 'wx', (err,fileDescriptor) => {
            if(!err && fileDescriptor) {
                const stringData = JSON.stringify(data)
                fs.writeFile(fileDescriptor, stringData, (err) => {
                    if(!err) {
                        fs.close(fileDescriptor, (err) => {
                            if(!err) {
                                callback(false)
                            } else {
                                callback('Error: Error closing file!')
                            }
                        })
                    } else {
                        callback('Error: Problem writing to file!')
                    }
                })
            } else {
                 callback('Error: File already exists!')
            }
        })
     },

     // Read file
     read(dir,file,callback) {
         fs.readFile(this.basePath + dir + '/' + file + '.json', 'utf8', (err,data) => {
             callback(err,data)
         })
     },

     // Update file
     update(dir,file,data,callback) {
         fs.open(this.basePath + dir + '/' + file + '.json', 'r+', (err, fileDescriptor) => {
             if(!err && fileDescriptor) {
                const stringData = JSON.stringify(data)
                fs.ftruncate(fileDescriptor, err => {
                    if(!err) {
                        fs.writeFile(fileDescriptor,stringData, err => {
                            if(!err) {
                                fs.close(fileDescriptor, err => {
                                    if(!err) {
                                        callback(false)
                                    } else {
                                        callback('Error: Closing file failed!')
                                    }
                                })
                            } else {
                                callback('Error: Writing to a file failed!')
                            }
                        })
                    } else {
                        callback('Error: File truncate failed!')
                    }
                })
             } else {
                 callback('Error: Cannot open the file, file may not exists!')
             }
         })
     },

     // Delete a file
     delete(dir,file,callback) {
         fs.unlink(this.basePath + dir + '/' + file + '.json', err => {
             if(!err) {
                 callback(false)
             } else {
                 callback('Error: Unable to delete a file!')
             }
         })
     }
 }

 module.exports = lib
