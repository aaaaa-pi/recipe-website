import icons from '../../img/icons.svg';
export default class View {
    _data;

    render(data, render = true) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError()

        this._data = data;
        const markup = this._generateMarkup();

        if (!render) return markup
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];

            // Updates changed TEXT  (更新文本)
            // nodeValue: 对于文档节点来说，nodeValue返回null. 对于 text, comment，和 CDATA 节点来说，nodeValue 返回该节点的文本内容. 对于 attribute 节点来说，返回该属性的属性值。
            // trim: trim() 方法会从一个字符串的两端删除空白字符。
            if (
                !newEl.isEqualNode(curEl) &&
                newEl.firstChild?.nodeValue.trim() !== ''
            ) {
                curEl.textContent = newEl.textContent;
            }

            // Updates changed ATTRIBUES （更新属性）
            if (!newEl.isEqualNode(curEl))
                Array.from(newEl.attributes).forEach(attr =>
                    curEl.setAttribute(attr.name, attr.value)
                );
        });
    }

    _clear() {
        this._parentElement.innerHTML = ''
    }

    // 加载动画
    renderSpinner() {
        const markup = `
          <div class="spinner">
                  <svg>
                    <use href="${icons}#icon-loader"></use>
                  </svg>
          </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    // 渲染错误消息到界面
    renderError(message = this._errorMessage) {
        const markup = `
            <div class="error">
                <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    // 渲染消息到界面
    renderMessage(message = this._message) {
        const markup = `
            <div class="message">
                <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

}