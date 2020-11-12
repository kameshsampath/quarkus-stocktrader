
// File Upload
(() => {

  // To act as a file-upload summary field, a label element with class
  // 'file-upload__field' should have its 'for' attribute point to the input
  // element with a type of 'file'.

  const fufield = '.file-upload__field';

  const init = () => {
    Array.prototype.forEach.call(document.querySelectorAll(fufield), field => {
      if (field.control) {
        field.control.addEventListener('change', e => {
          if (field.control.files && (field.control.files.length > 1)) {
            field.innerHTML = `${field.control.files.length} files selected`;
          } else {
            field.innerHTML = field.control.value &&
                              field.control.value.split('\\').pop();
          }
        });
      }
    });
  };

  util.initOnReady(init);

})();
