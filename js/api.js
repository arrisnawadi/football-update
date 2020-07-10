//#region API
const API_TOKEN = 'aba37a6a76374be681c95cb1913410e1'
const competition_url = 'https://api.football-data.org/v2/competitions'
const stats_url = 'https://api.football-data.org/v2/competitions/'
const teams_url = 'https://api.football-data.org/v2/teams/'
//#endregion

//#region Promise handler
const status = response => {
  if (response.status !== 200) {
    console.log('Error :' + response.status)
    return Promise.reject(new Error(response.statusText))
  } else {
    return Promise.resolve(response)
  }
}

const json = response => {
  return response.json()
}

const error = error => {
  console.log('Error : ' + error)
}
//#endregion

//#region Select Division
const divisionList = () => {
  if ('caches' in window) {
    caches.match(competition_url, {
      headers: { 'X-Auth-Token': API_TOKEN }
    }).then(response => {
      if (response) {
        response.json().then(data => {
          let leaguesHTML = ''
          const filterComp = data.competitions.filter(comp => comp.id === 2021 || comp.id === 2002 || comp.id === 2019 || comp.id === 2014)
          filterComp.forEach(comp => {
            leaguesHTML += `
            <div class='col s12 m6 l3 xl3'>
              <div class='card division-card'>
                <a href='./league.html?id=${comp.id}'>
                  <div class='card-image waves-effect waves-block waves-light'>
                    <img class='division-logo' src=img/${comp.name.replace(' ', '-')}.png alt='${comp.name.replace(' ', '-')}' />
                  </div>
                </a>
                <div class='card-content'>
                  <span class='card-title truncate center-align flow-text'>${comp.name}</span>
                </div>
              </div>
            </div>
            `
          })
          document.querySelector('.list-league').innerHTML = 'Select League'
          document.getElementById('leagues').innerHTML = leaguesHTML
        })
      }
    })
  }

  fetch(competition_url, {
    headers: { 'X-Auth-Token': API_TOKEN }
  })
    .then(status)
    .then(json)
    .then(data => {
      let leaguesHTML = ''
      const filterComp = data.competitions.filter(comp => comp.id === 2021 || comp.id === 2002 || comp.id === 2019 || comp.id === 2014)
      filterComp.forEach(comp => {
        leaguesHTML += `
        <div class='col s12 m6 l3 xl3'>
          <div class='card division-card'>
            <a href='./league.html?id=${comp.id}'>
              <div class='card-image waves-effect waves-block waves-light'>
                <img class='division-logo' src=img/${comp.name.replace(' ', '-')}.png alt='${comp.name.replace(' ', '-')}' />
              </div>
            </a>
            <div class='card-content'>
              <span class='card-title truncate center-align'>${comp.name}</span>
            </div>
          </div>
        </div>
        `
      })
      document.querySelector('.list-league').innerHTML = 'Select League'
      document.getElementById('leagues').innerHTML = leaguesHTML
    })
    .catch(error)
}
//#endregion

//#region League Standings
const getLeagueStandings = () => {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search)
    const idParam = urlParams.get('id')

    if ('caches' in window) {
      caches.match(stats_url + idParam + '/standings', {
        headers: { 'X-Auth-Token': API_TOKEN }
      }).then(response => {
        if (response) {
          response.json().then(data => {
            let standingsHTML = ''

            data.standings[0].table.forEach(stand => {
              const teamLogo = (stand.team.crestUrl == '' || stand.team.crestUrl == null) ? 'img/icon.png' : stand.team.crestUrl
              standingsHTML += `
              <tr class='team-stand'>
                <td style='padding-left: 10px'>${stand.position}</td>
                <td class='max-td'><img onerror="this.onerror=null;this.src='img/icon.png';" style='width:16px; display:block;' src='${teamLogo}' alt='${stand.team.name}' /></td>
                <td><a href='./team.html?id=${stand.team.id}'>${stand.team.name}</a></td>
                <td>${stand.playedGames}</td>
                <td>${stand.won}</td>
                <td>${stand.draw}</td>
                <td>${stand.lost}</td>
                <td>${stand.points}</td>
                <td class='max-td'>${stand.goalsFor}</td>
                <td class='max-td'>${stand.goalsAgainst}</td>
                <td>${stand.goalDifference}</td>
              </tr>
              `
            })
            document.getElementById('division-name').innerHTML = data.competition.name
            document.getElementById('standings').innerHTML = standingsHTML
            const matches = document.querySelector('.matchLink')
            matches.setAttribute('href', `./match.html?id=${idParam}`)
            resolve(data)
          })
        }
      })
    }

    fetch(stats_url + idParam + '/standings', {
      headers: { 'X-Auth-Token': API_TOKEN }
    })
      .then(status)
      .then(json)
      .then(data => {
        let standingsHTML = ''

        data.standings[0].table.forEach(stand => {
          const teamLogo = (stand.team.crestUrl == '' || stand.team.crestUrl == null) ? 'img/icon.png' : stand.team.crestUrl
          standingsHTML += `
          <tr>
            <td style='padding-left: 10px'>${stand.position}</td>
            <td class='max-td'><img onerror="this.onerror=null;this.src='img/icon.png';" style='width:16px; display:block;' src='${teamLogo}' alt='${stand.team.name}' /></td>
            <td><a href='./team.html?id=${stand.team.id}'>${stand.team.name}</a></td>
            <td>${stand.playedGames}</td>
            <td>${stand.won}</td>
            <td>${stand.draw}</td>
            <td>${stand.lost}</td>
            <td>${stand.points}</td>
            <td class='max-td'>${stand.goalsFor}</td>
            <td class='max-td'>${stand.goalsAgainst}</td>
            <td>${stand.goalDifference}</td>
          </tr>
          `
        })

        document.getElementById('division-name').innerHTML = data.competition.name
        document.getElementById('standings').innerHTML = standingsHTML
        const matches = document.querySelector('.matchLink')
        matches.setAttribute('href', `./match.html?id=${idParam}`)
      })
      .catch(error)
  })
}
//#endregion

//#region League Top Scorers
const getLeagueScorers = () => {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search)
    const idParam = urlParams.get('id')

    if ('caches' in window) {
      caches.match(stats_url + idParam + '/scorers', {
        headers: { 'X-Auth-Token': API_TOKEN }
      }).then(response => {
        if (response) {
          response.json().then(data => {
            let scorersHTML = ''

            data.scorers.forEach(scorer => {
              scorersHTML += `
            <tr>
              <td style='padding-left: 10px'>${scorer.player.name}</td>
              <td>${scorer.team.name}</td>
              <td>${scorer.numberOfGoals}</td>
            </tr>
            `
            })
            document.getElementById('scorers').innerHTML = scorersHTML
            resolve(data)
          })
        }
      })
    }

    fetch(stats_url + idParam + '/scorers', {
      headers: { 'X-Auth-Token': API_TOKEN }
    })
      .then(status)
      .then(json)
      .then(data => {
        let scorersHTML = ''

        data.scorers.forEach(scorer => {
          scorersHTML += `
          <tr>
            <td style='padding-left: 10px'>${scorer.player.name}</td>
            <td>${scorer.team.name}</td>
            <td>${scorer.numberOfGoals}</td>
          </tr>
          `
        })
        document.getElementById('scorers').innerHTML = scorersHTML
      })
      .catch(error)
  })
}
//#endregion

//#region Team Info
const getClubInfo = () => {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search)
    const idParam = urlParams.get('id')

    if ('caches' in window) {
      caches.match(teams_url + idParam, {
        headers: { 'X-Auth-Token': API_TOKEN }
      }).then(response => {
        if (response) {
          response.json().then(data => {
            let teamInfoHTML = ''
            let squadHTML = ''
            let i = 1

            teamInfoHTML = `
            <tr>
              <td>Name</td>
              <td>:</td>
              <td>${data.name}</td>
            </tr>
            <tr>
              <td>Short Name</td>
              <td>:</td>
              <td>${data.shortName}</td>
            </tr>
            <tr>
              <td>Founded</td>
              <td>:</td>
              <td>${data.founded}</td>
            </tr>
            <tr>
              <td>Venue</td>
              <td>:</td>
              <td>${data.venue}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>:</td>
              <td>${data.address}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>${data.email}</td>
            </tr>
            <tr>
              <td>Website</td>
              <td>:</td>
              <td>${data.website}</td>
            </tr>
            <tr>
              <td>Logo</td>
              <td>:</td>
              <td><img src='${data.crestUrl}' alt='${data.name}' class='club-logo' /></td>
            </tr>
            `

            data.squad.forEach(squad => {
              // Hitung tanggal lahir
              const dob = squad.dateOfBirth.substring(0, 10)
              const today = new Date()
              const birthDate = new Date(dob)
              const diffYear = today.getFullYear() - birthDate.getFullYear()
              const diffMonth = today.getMonth() - birthDate.getMonth()
              const age = (diffMonth < 0 || (diffMonth === 0 && today.getDate() < birthDate.getDate())) ? diffYear - 1 : diffYear

              // Set position
              const pos = (squad.position === null) ? '-' : squad.position

              squadHTML += `
              <tr>
                <td class='center-align'>${i++}</td>
                <td>${squad.name}</td>
                <td>${pos}</td>
                <td>${squad.nationality}</td>
                <td>${age}</td>
              </tr>
              `
            })
            document.getElementById('team-info').innerHTML = teamInfoHTML
            document.getElementById('squad').innerHTML = squadHTML
            document.querySelector('.team-name').innerHTML = `${data.name.toUpperCase()}`
            const backBtn = document.querySelector('.sidenav-trigger')
            backBtn.setAttribute('href', `./league.html?id=${data.activeCompetitions[0].id}`)
            resolve(data)
          })
        }
      })
    }

    fetch(teams_url + idParam, {
      headers: { 'X-Auth-Token': API_TOKEN }
    })
      .then(status)
      .then(json)
      .then(data => {
        let teamInfoHTML = ''
        let squadHTML = ''
        let i = 1

        teamInfoHTML = `
        <tr>
          <td>Name</td>
          <td>:</td>
          <td>${data.name}</td>
        </tr>
        <tr>
          <td>Short Name</td>
          <td>:</td>
          <td>${data.shortName}</td>
        </tr>
        <tr>
          <td>Founded</td>
          <td>:</td>
          <td>${data.founded}</td>
        </tr>
        <tr>
          <td>Venue</td>
          <td>:</td>
          <td>${data.venue}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td>:</td>
          <td>${data.address}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>:</td>
          <td>${data.email}</td>
        </tr>
        <tr>
          <td>Website</td>
          <td>:</td>
          <td>${data.website}</td>
        </tr>
        <tr>
          <td>Logo</td>
          <td>:</td>
          <td><img src='${data.crestUrl}' alt='${data.name}' class='club-logo' /></td>
        </tr>
        `

        data.squad.forEach(squad => {
          // Hitung tanggal lahir
          const dob = squad.dateOfBirth.substring(0, 10)
          const today = new Date()
          const birthDate = new Date(dob)
          const diffYear = today.getFullYear() - birthDate.getFullYear()
          const diffMonth = today.getMonth() - birthDate.getMonth()
          const age = (diffMonth < 0 || (diffMonth === 0 && today.getDate() < birthDate.getDate())) ? diffYear - 1 : diffYear

          // Set position
          const pos = (squad.position === null) ? '-' : squad.position

          squadHTML += `
          <tr>
            <td class='center-align'>${i++}</td>
            <td>${squad.name}</td>
            <td>${pos}</td>
            <td>${squad.nationality}</td>
            <td>${age}</td>
          </tr>
          `
        })
        document.getElementById('team-info').innerHTML = teamInfoHTML
        document.getElementById('squad').innerHTML = squadHTML
        document.querySelector('.team-name').innerHTML = `${data.name.toUpperCase()}`
        const backBtn = document.querySelector('.sidenav-trigger')
        backBtn.setAttribute('href', `./league.html?id=${data.activeCompetitions[0].id}`)
        resolve(data)
      })
      .catch(error)
  })
}
//#endregion

//#region Finished Matches
const getAllMatches = () => {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search)
    const idParam = urlParams.get('id')

    if ('caches' in window) {
      caches.match(stats_url + idParam + '/matches', {
        headers: { 'X-Auth-Token': API_TOKEN }
      }).then(response => {
        if (response) {
          response.json().then(data => {
            if (data.matches.length > 0) {
              let matchesHTML = ''
              data.matches.forEach(match => {
                const matchDate = new Date(match.utcDate).toDateString()
                const score = (match.score.fullTime.homeTeam === null || match.score.fullTime.awayTeam === null) ? `${matchDate}` : `${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}` 
                matchesHTML += `
                  <tr class='matchday' data-matchday=matchday-${match.matchday}>
                    <td colspan=4 style='background-color:#00ACC1; color:#ffffff; font-weight:bold;'>Matchday ${match.matchday}</td>
                  </tr>
                  <tr>
                    <td>${match.homeTeam.name}</td>
                    <td>${score}</td>
                    <td>${match.awayTeam.name}</td>
                  </tr>
                `
              })
              document.getElementById('all-matches').innerHTML = matchesHTML
              const leagueMatch = document.querySelectorAll('.matchday')
              const newArr = []
              leagueMatch.forEach(arr => {
                (newArr.includes(arr.getAttributeNode('data-matchday').value) === true) ? arr.style.display = 'none' : newArr.push(arr.getAttributeNode('data-matchday').value)
              })
            } else {
              const notifHTML = `<h5 class='center-align red-text text-darken-2'>No matches found</h5>`
              document.getElementById('all-matches').innerHTML = notifHTML
            }
            
            const backBtn = document.querySelector('.sidenav-trigger')
            backBtn.setAttribute('href', `./league.html?id=${idParam}`)
            document.querySelector('#division-matches').innerHTML = `${data.competition.name} Matches`
            resolve(data)
          })
        }
      })
    }

    fetch(stats_url + idParam + '/matches', {
      headers: { 'X-Auth-Token': API_TOKEN }
    })
      .then(status)
      .then(json)
      .then(data => {
        if (data.matches.length > 0) {
          let matchesHTML = ''
          data.matches.forEach(match => {
            const matchDate = new Date(match.utcDate).toDateString()
            const score = (match.score.fullTime.homeTeam === null || match.score.fullTime.awayTeam === null) ? `${matchDate.replace(/\s(?=[A-Z])/, ', ')}` : `${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}`
            matchesHTML += `
              <tr class='matchday' data-matchday=matchday-${match.matchday}>
                <td colspan=4 style='background-color:#00ACC1; color:#ffffff; font-weight:bold;'>Matchday ${match.matchday}</td>
              </tr>
              <tr>
                <td>${match.homeTeam.name}</td>
                <td>${score}</td>
                <td>${match.awayTeam.name}</td>
              </tr>
            `
          })
          document.getElementById('all-matches').innerHTML = matchesHTML
          const leagueMatch = document.querySelectorAll('.matchday')
          const newArr = []
          leagueMatch.forEach(arr => {
            (newArr.includes(arr.getAttributeNode('data-matchday').value) === true) ? arr.style.display = 'none' : newArr.push(arr.getAttributeNode('data-matchday').value)
          })
        } else {
          const notifHTML = `<h5 class='center-align red-text text-darken-2'>No matches found</h5>`
          document.getElementById('all-matches').innerHTML = notifHTML
        }

        const backBtn = document.querySelector('.sidenav-trigger')
        backBtn.setAttribute('href', `./league.html?id=${idParam}`)
        document.querySelector('#division-matches').innerHTML = `${data.competition.name} Matches`
      })
      .catch(error)
  })
}
//#endregion

//#region list Favorite clubs
const getFavoriteClubs = () => {
  getAll().then(clubs => {
    if (clubs.length > 0) {
      let clubsHTML = ''
      clubs.forEach(club => {
        clubsHTML += `
          <div class='col s12 m6 l3 xl3'>
            <div class='card club-card'>
              <a href='./team.html?id=${club.id}&favorite=true'>
                <div class='card-image waves-effect waves-block waves-light'>
                  <img class='team-logo' src='${club.crestUrl}' alt='${club.shortName}' />
                </div>
              </a>
              <div class='card-content'>
                <span class='card-title truncate center-align'>${club.shortName}</span>
                <p class='center-align'>${club.activeCompetitions[0].area.name}</p>
              </div>
              </div>
          </div>
        `
      })
      document.getElementById('clubs').innerHTML = clubsHTML
    } else {
      const notifHTML = `<h5 class='center-align red-text text-darken-2'>No favorite club added</h5>`
      document.getElementById('clubs').innerHTML = notifHTML
    }
  })
}
//#endregion

//#region FavoriteClubById
const getFavoriteClubById = () => {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search)
    const idParam = urlParams.get('id')
    const idDb = parseInt(idParam)

    getById(idDb).then(club => {
      let teamInfoHTML = ''
      let squadHTML = ''
      let i = 1

      teamInfoHTML = `
      <tr>
        <td>Name</td>
        <td>:</td>
        <td>${club.name}</td>
      </tr>
      <tr>
        <td>Short Name</td>
        <td>:</td>
        <td>${club.shortName}</td>
      </tr>
      <tr>
        <td>Founded</td>
        <td>:</td>
        <td>${club.founded}</td>
      </tr>
      <tr>
        <td>Venue</td>
        <td>:</td>
        <td>${club.venue}</td>
      </tr>
      <tr>
        <td>Address</td>
        <td>:</td>
        <td>${club.address}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>:</td>
        <td>${club.email}</td>
      </tr>
      <tr>
        <td>Website</td>
        <td>:</td>
        <td>${club.website}</td>
      </tr>
      <tr>
        <td>Logo</td>
        <td>:</td>
        <td><img src='${club.crestUrl}' alt='${club.shortName}' class='club-logo' /></td>
      </tr>
    `

      club.squad.forEach(squad => {
        // Hitung tanggal lahir
        const dob = squad.dateOfBirth.substring(0, 10)
        const today = new Date()
        const birthDate = new Date(dob)
        const diffYear = today.getFullYear() - birthDate.getFullYear()
        const diffMonth = today.getMonth() - birthDate.getMonth()
        const age = (diffMonth < 0 || (diffMonth === 0 && today.getDate() < birthDate.getDate())) ? diffYear - 1 : diffYear

        // Set position
        const pos = (squad.position === null) ? '-' : squad.position

        squadHTML += `
        <tr>
          <td class='center-align'>${i++}</td>
          <td>${squad.name}</td>
          <td>${pos}</td>
          <td>${squad.nationality}</td>
          <td>${age}</td>
        </tr>
      `
      })
      document.getElementById('team-info').innerHTML = teamInfoHTML
      document.getElementById('squad').innerHTML = squadHTML
      document.querySelector('.team-name').innerHTML = `${club.name.toUpperCase()}`
      resolve(club)
    })
  })
}
//#endregion