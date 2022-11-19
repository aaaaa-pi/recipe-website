import View from "./View";
import previewView from "./previewView";
class ResultsView extends View {
  _errorMessage = '找不到食谱，请重新尝试';
  _message = ''

  _parentElement = document.querySelector('.results')

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('')
  }
}


export default new ResultsView() 