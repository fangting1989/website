const ComFun={
    ImageViewer:function(obj,bshow){
        var image = new Image();
        image.src = obj.filepath;
        var viewer = new Viewer(image, {
            zIndexInline:9999,
          hidden: function () {
            viewer.destroy();
          },
          navbar:false,
          toolbar: {
              zoomIn: 1,
              zoomOut: 1,
              oneToOne: 1,
              reset: 1,
              prev: 0,
              play: 0,
              next: 0,
              rotateLeft: 1,
              rotateRight: 1,
              flipHorizontal: 1,
              flipVertical: 1,
          }
        });
        viewer.show();
    }
}

