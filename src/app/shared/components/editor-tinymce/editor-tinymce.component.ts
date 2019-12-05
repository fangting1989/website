import {
  Component,
  AfterViewInit,
  EventEmitter,
  OnDestroy,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {dataServices} from './../../services';
// import 'tinymce';
// import 'tinymce/themes/modern';
// import 'tinymce/plugins/table';
// import 'tinymce/plugins/link';
// import 'tinymce/plugins/image';
// import 'tinymce/plugins/imagetools';


@Component({
  selector: 'editor-tinymce',
  templateUrl: './editor-tinymce.component.html',
  styles: []
})

export class EditorTinymceComponent implements AfterViewInit,OnDestroy {

  constructor(
    private dataServices:dataServices
  ) { }

  ngOnInit() {
  }

  @Input() elementId: String;
  @Input() initialContent: String;
  @Output() onEditorContentChange = new EventEmitter();

  editor;

  ngAfterViewInit() {
      let self = this;
      setTimeout(function(){
        //styleselect
        tinymce.init({
          selector: '#' + self.elementId,
          height: 300,
          plugins: ['link', 'table','image'],
          toolbar: 'insert | undo redo |  fontsizeselect | forecolor backcolor |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | l link media image  | print preview fullpage ',
          skin_url: 'assets/plugins/tinymce/skins/lightgray',
          relative_urls : false,
          remove_script_host : false,
          init_instance_callback:function(editor){
            var dataEditor = editor
            setTimeout(function(){
             //设置初始化值
              if(self.initialContent && self.initialContent.length > 0){
                dataEditor.setContent(self.initialContent);
              }else{
                dataEditor.setContent('')
              }
            },500)
          },
          setup: editor => {
              self.editor = editor;
              editor.on('keyup change', () => {
                  const content = editor.getContent();
                  self.onEditorContentChange.emit(content);
              });
              
          },
          // 图片上传功能
          images_upload_handler: function(blobInfo, success, failure) {
            var formData;
            formData = new FormData();
            formData.append("file", blobInfo.blob(), blobInfo.filename());
            formData.append("filepath","tinymce")
            self.dataServices.uploadImg(formData).subscribe(result => {
              if(result){
                success( WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+  result);
              }else{
                failure("")
              }
            })
        }
      });
      },500)
  }

  ngOnDestroy() {
      tinymce.remove(this.editor);
  }

}
