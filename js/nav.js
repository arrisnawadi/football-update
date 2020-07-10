document.addEventListener('DOMContentLoaded', () => {

  const navs = document.querySelectorAll('.sidenav')
  M.Sidenav.init(navs)

  let page = window.location.hash.substr(1)
  if (page === '') page = 'home'

  const loadPage = (page) => {
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4) {
        const content = document.querySelector('#body-content')

        if (page === 'home') {
          divisionList()
        } else if (page === 'favorite') {
          getFavoriteClubs()
        }

        if (xhttp.status == 200) {
          content.innerHTML = xhttp.responseText
        } else if (xhttp.status == 404) {
          content.innerHTML = '<h4>Halaman tidak ditemukan!</h4>'
        } else {
          '<p>Halaman tidak dapat diakses.</p>'
        }
      }
    }
    xhttp.open('GET', 'pages/' + page + '.html', true)
    xhttp.send()
  }

  const loadNav = () => {
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4) {
        if (xhttp.status != 200) return

        document.querySelectorAll('.topnav, .sidenav').forEach(elem => {
          elem.innerHTML = xhttp.responseText
        })

        document.querySelectorAll('.topnav a, .sidenav a').forEach(elem => {
          elem.addEventListener('click', event => {
            const sidenav = document.querySelector('.sidenav')
            M.Sidenav.getInstance(sidenav).close()

            page = event.target.getAttribute('href').substr(1)
            loadPage(page)
          })
        })
      }
    }
    xhttp.open('GET', 'nav.html', true)
    xhttp.send()
  }

  loadNav()
  loadPage(page)

})