import View from "./View";
import previewView from "./previewView";
class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list')
    _errorMessage = '还没有书签,快去添加书签吧！';
    _message = ''

    addHandleRender(handle) {
        window.addEventListener('load', handle)
    }
    _generateMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
    }
}


export default new BookmarksView() 