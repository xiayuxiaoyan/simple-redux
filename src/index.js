function createStore(state, stateChange){
    const listeners = [];
    const getState = () => state;
    const dispatch = (action) => {
			state = stateChange(state, action);
      listeners.forEach(fn => fn());
    };
    const subscribe = fn => {
        listeners.push(fn);
    };
    return {getState, dispatch, subscribe}
}
const appState = {
    title: {
        text: 'React 小书',
        color: 'red',
    },
    content: {
        text: 'React 小书内容'
    }
}

// 增加改动数据的代价，调试断点在这里，清楚知道谁调用了他
function stateChange(state, action) {
	switch(action.type){
		case 'UPDATE_TITLE_TEXT':
			return { // 构建新的对象并且返回
				...state,
				title: {
					...state.title,
					text: action.text
				}
			}
		case 'UPDATE_TITLE_COLOR':
			return { // 构建新的对象并且返回
				...state,
				title: {
					...state.title,
					color: action.color
				}
			}
		default:
			return state // 没有修改，返回原来的对象
  }
}
const store = createStore(appState, stateChange)

function renderApp (newAppState, oldAppState = {}) { // 防止 oldAppState 没有传入，所以加了默认参数 oldAppState = {}
  if (newAppState === oldAppState) return // 数据没有变化就不渲染了
  console.log('render app...')
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle (newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return // 数据没有变化就不渲染了
  console.log('render title...')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent (newContent, oldContent = {}) {
  if (newContent === oldContent) return // 数据没有变化就不渲染了
  console.log('render content...')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}


renderApp(appState)
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色

let oldState = store.getState() // 缓存旧的 state

// 收集数据变化操作，传入箭头函数包装的执行函数，从而达到传参目的
store.subscribe(() => {
	let newState = store.getState() // 缓存旧的 state
	renderApp(oldState, newState)
	oldState = newState;
})