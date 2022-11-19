// 总控台
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import BookmarksView from './views/BookmarksView.js';


///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1)

    if (!id) return

    recipeView.renderSpinner()

    resultsView.update(model.getSearchResultsPage())
    // 3. 更新书签视图
    BookmarksView.update(model.state.bookmarks)

    // 1. 加载食谱
    await model.loadRecipe(id)

    // 2. 渲染配方
    recipeView.render(model.state.recipe)

  } catch (err) {
    recipeView.renderError()
  }
}

const controlSearchResult = async function () {
  try {
    // 搜索结果加载
    resultsView.renderSpinner()
    const query = searchView.getQuery()
    if (!query) return

    await model.loadSearchResult(query)
    // 渲染搜索结果，将API返回的查询结果数据给到resultView
    resultsView.render(model.getSearchResultsPage())

    paginationView.render(model.state.search)
  } catch (err) {
    console.log(err);
  }
}

const controlPagination = function (goToPage) {
  // 渲染搜索结果，将API返回的查询结果数据给到resultView
  resultsView.render(model.getSearchResultsPage(goToPage))

  paginationView.render(model.state.search)
}

// 更改分量对应更改配方中的数量
const controlServings = function (newServings) {
  // 更新配方
  model.updateServings(newServings)
  // 更新视图
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else if (model.state.recipe.bookmarked) model.delectBookmark(model.state.recipe.id)
  recipeView.update(model.state.recipe)
  BookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks)
}

// ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));
const init = function () {
  recipeView.addHandleRender(controlRecipes)
  recipeView.addHandleUpdateServings(controlServings)
  recipeView.addHandleBookmark(controlAddBookmark)
  searchView.addHandleSearch(controlSearchResult)
  paginationView.addHandleClick(controlPagination)
  BookmarksView.addHandleRender(controlBookmarks)
}
init()

