/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"dxZRrtj2JS175pfk","label":"reddit","bookmarks":[{"id":"HzpL1JlU3cMNJXmD","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"4JDcPbfcTXAYxyH9","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"Fyz5mbDu31OI4F7q","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"TKvL8hHvvWwjUvuG","label":"design tools","bookmarks":[{"id":"GrdFkjjUbO1hb6ic","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"Zk9HsarJ57oxzQj5","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"9m7mPWnAO9u3kgYf","label":"haikei","url":"https://app.haikei.app/"},{"id":"1BzffE7pTte0cVAQ","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"jr4oqyhSw1ly1W5u","label":"worth reading","bookmarks":[{"id":"FoUIOse4dDk7OipI","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"jmKlGSMIbs764ip7","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"BLS7D3YXyQVOdgsW","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"Hv50OSgv6OgWqgZB","label":"sources","bookmarks":[{"id":"hplV3X9afCmmvyF4","label":"icons","url":"https://feathericons.com/"},{"id":"FVhcA6VBsXsPaIE0","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"bPQrtHf93Q7PLVR9","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"GGXXE6393ZPqIKcT","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
