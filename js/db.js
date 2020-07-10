//#region Create database
const dbPromised = idb.open('club-info', 1, upgradeDb => {
  const clubsObjectStore = upgradeDb.createObjectStore('clubs', {
    keyPath: 'id'
  })
  clubsObjectStore.createIndex('shortName', 'shortName', { unique: false })
})
//#endregion

//#region Adding Club to Favorite
const saveForLater = club => {
  dbPromised
    .then(db => {
      const tx = db.transaction(['clubs'], 'readwrite')
      const store = tx.objectStore('clubs')
      store.add(club)
      return tx.complete
    })
    .then(() => {
      alert('successfully added favorite club')
      window.location = '../index.html'
    })
}
//#endregion

//#region Removing Club to Favorite
const deleteFromSave = club => {
  dbPromised
    .then(db => {
      const tx = db.transaction(['clubs'], 'readwrite')
      const store = tx.objectStore('clubs')
      store.delete(club.id)
      return tx.complete
    })
    .then(() => {
      alert('Successfully deleted favorite club')
      window.location = '../index.html'
    })
}
//#endregion

//#region List favorites
const getAll = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        const tx = db.transaction(['clubs'], 'readonly')
        const store = tx.objectStore('clubs')
        return store.getAll()
      })
      .then(clubs => {
        resolve(clubs)
      })
  })
}
//#endregion

//#region Detail favorite club
const getById = (id) => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        const tx = db.transaction(['clubs'], 'readonly')
        const store = tx.objectStore('clubs')
        return store.get(id)
      })
      .then(club => {
        resolve(club)
      })
  })
}
//#endregion