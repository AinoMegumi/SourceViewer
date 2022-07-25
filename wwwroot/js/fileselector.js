const FileList = {
    files: [],
    oninit: () => {
        return fetch('./source')
            .then(res => res.json())
            .then(r => {
                FileList.files = r.files.map(f => f.replace('./Src/', ''));
                m.redraw();
            })
            .catch(er => console.log(er));
    },
    view: () => FileList.files.map(filename => m('option', { value: filename }, filename)),
};

const Viewer = {
    selectedFile: '',
    onupdate: () => m.redraw(),
    view: () => {
        return m('section', [
            m('p', 'ファイル選択'),
            m(
                'select',
                {
                    onchange: e => {
                        Viewer.selectedFile = e.target.value;
                    },
                    value: Viewer.selectedFile,
                },
                m(FileList)
            ),
            m('input[type=button]', {
                value: '照会',
                onclick: () => {
                    window.location.href = './source?file=' + Viewer.selectedFile;
                },
            }),
        ]);
    },
};

m.mount(document.getElementById('fileview'), Viewer);
