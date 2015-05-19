(function(){
    'use strict';

    var module = angular.module('std.file.reader', []);

    module.factory('stdFileReader',
        [
            function() {
                this.read = function(file, allowed) {
                    if (allowed === 'image') {
                        var filter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                        if (!filter.test(file.type)) { alert("You must select a valid image file!"); return; }
                    }

                    return new Promise(function(resolve, reject) {
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            var results = {
                                data: e.target.result,
                                mimeType: file.type,
                                filename: file.name
                            };
                            resolve(results)
                        };
                        reader.readAsDataURL(file);
                    });
                };

                return {
                    read: this.read
                }
            }
        ]);
})();
