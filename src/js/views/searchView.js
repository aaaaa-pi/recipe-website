class SearchView {
    _parentEl = document.querySelector('.search')
    _clearInput() {
        this._parentEl.querySelector('.search__field').value = ''
    }

    getQuery() {
        const query = this._parentEl.querySelector('.search__field').value
        this._clearInput()
        return query
    }

    // 监听提交
    addHandleSearch(handle) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            handle();
        })
    }
}

export default new SearchView()