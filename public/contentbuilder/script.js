

var builder = new ContentBuilder({
    container: '#container',
    builderMode: '',
    toolbar: 'left',
    toolbarDisplay: 'always',
    fontAssetPath: '/cbjs4/assets/fonts/',
    columnTool: true,
    rowTool: 'right',
    elementTool: true,
    snippetAddTool: true,
    outlineMode: '',
    rowcolOutline: true,
    outlineStyle: '',
    elementHighlight: true,
    snippetOpen: true,
    toolStyle: '',
    // row: 'row',
    // cols: ['large-1 columns', 'large-2 columns', 'large-3 columns', 'large-4 columns', 'large-5 columns', 'large-6 columns', 'large-7 columns', 'large-8 columns', 'large-9 columns', 'large-10 columns', 'large-11 columns', 'large-12 columns'],
    snippetsSidebarDisplay: 'always',
    htmlSyntaxHighlighting: true,
    clearPreferences: true, //reset settings on load
    buttons: ['bold', 'italic', 'underline', 'formatting', 'color', 'align', 'textsettings', 'createLink', 'image', '|', 'list', 'font', 'formatPara', '|', 'html', '|', 'undo', 'redo'],
    buttonsMore: [],
    scriptPath: '/cbjs4/contentbuilder/',
    snippetData: '/cbjs4/assets/email-blocks/snippetlist.html',
    rowFormat: '<div><table align="center" class="ctn float-center"><tbody><tr><td><table class="rw"><tbody><tr>' +
        '</tr></tbody></table></td></tr></tbody></table></div>',  //convert ver. div ke table
    cellFormat: '<th class="small-12 large-12 cols first last"><table><tbody><tr><th>' +
        '</th></tr></tbody></table></th>', 	//convert ver. div ke table
    emailMode: false,
    absolutePath: false,
    emailSnippetCategories: [
        [1, "Logo"],
        [14, "Call to Action"],
        [2, "Title"],
        [3, "Title, Subtitle"],
        [4, "Info, Title"],
        [7, "Paragraph"],
        [6, "Heading"],
        [8, "Buttons"],
        [9, "Callouts"],
        [10, "Images + Caption"],
        [12, "Images"],
        [13, "List"],
        [15, "Pricing"],
        [16, "Quotes"],
        [17, "Profile"],
        [18, "Contact Info"],
        [19, "Footer"],
        [20, "Separator"]
    ],
    defaultEmailSnippetCategory: 14
});