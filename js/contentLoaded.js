//#region memanggil method ketika membuka halaman
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname === '/football-update/league.html') {
    getLeagueStandings()
    getLeagueScorers()
  } else if (window.location.pathname === '/football-update/team.html') {
    const urlParams = new URLSearchParams(window.location.search)
    const isFromSaved = urlParams.get('favorite')

    const btnSave = document.getElementById('save')
    const btnRemove = document.getElementById('remove')

    if (isFromSaved) {
      btnSave.style.display = 'none'

      getFavoriteClubById()

      const data = getFavoriteClubById()

      btnRemove.onclick = () => {
        data.then(club => {
          deleteFromSave(club)
        })
      }
    } else {
      btnRemove.style.display = 'none'

      const item = getClubInfo()

      btnSave.onclick = () => {
        item.then(club => {
          saveForLater(club)
        })
      }
    }
  } else if (window.location.pathname === '/football-update/match.html') {
    getAllMatches()
  }
})
//#endregion