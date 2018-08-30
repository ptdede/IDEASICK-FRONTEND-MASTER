const mediumEditorThemes = `
.medium-toolbar-arrow-under:after {
  border-color: #242424 transparent transparent transparent;
  top: 50px; }

.medium-toolbar-arrow-over:before {
  border-color: transparent transparent #242424 transparent;
  top: -8px; }

.medium-editor-toolbar {
  background-color: #242424;
  background: -webkit-linear-gradient(top, #242424, rgba(36, 36, 36, 0.75));
  background: linear-gradient(to bottom, #242424, rgba(36, 36, 36, 0.75));
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 0 0 3px #000; }
  .medium-editor-toolbar li button {
    background-color: #242424;
    background: -webkit-linear-gradient(top, #242424, rgba(36, 36, 36, 0.89));
    background: linear-gradient(to bottom, #242424, rgba(36, 36, 36, 0.89));
    border: 0;
    border-right: 1px solid #000;
    border-left: 1px solid #333;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
    color: #fff;
    height: 50px;
    min-width: 50px;
    -webkit-transition: background-color .2s ease-in;
            transition: background-color .2s ease-in; }
    .medium-editor-toolbar li button:hover {
      background-color: #000;
      color: yellow; }
  .medium-editor-toolbar li .medium-editor-button-first {
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px; }
  .medium-editor-toolbar li .medium-editor-button-last {
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px; }
  .medium-editor-toolbar li .medium-editor-button-active {
    background: #4c4c4c;
    color: yellow; }

.medium-editor-toolbar-form {
  background: #242424;
  border-radius: 5px;
  color: #999; }
  .medium-editor-toolbar-form .medium-editor-toolbar-input {
    background: #242424;
    box-sizing: border-box;
    color: #ccc;
    height: 50px; }
  .medium-editor-toolbar-form a {
    color: #fff; }

.medium-editor-toolbar-anchor-preview {
  background: #242424;
  border-radius: 5px;
  color: #fff; }

.medium-editor-placeholder:after {
  color: #b3b3b1; }

`;

export default mediumEditorThemes;
