
- 2019-11-22 用更安全稳定的方法重构记分板。

  ```javascript
  function extractTournamentStore(text) {
      const json = text.replace(/[\s\S]+\['TournamentStore'] = /, '')
                       .replace(/; window._initialStoreState\['ThemeStore'][\s\S]+/, '');
      return JSON.parse(json);
  }

  const tournament = await fetch('https://challonge.com/tsl_1/module')
                           .then(resp => resp.text())
                           .then(html => $(html).find('script')[0].innerText)
                           .then(text => extractTournamentStore(text));
  ```

- 2019-07-13 重新设计一个赛事LOGO。不能放三个图。

- 2019-07-13 给部分图片加上链接。

- 2019-07-13 建立视频合集页面。

+ 2019-06-21 MO宣传图。

+ 2019-06-15 增添一个历史赛事页面，以显示历史赛事的赛制等相关信息，方便浏览器直接查看。

+ 2019-07-13 捐助页面列出每届赛事的详细收支。

+ 2019-07-13 用绝对链接代替相对链接。
