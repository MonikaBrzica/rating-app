export default {
  getSettings (state) {
    return state.settings
  },
  getEmoticons (state) {
    return state.emoticons
  },
  getEmotionsArr: (state) => (count) => {
    // mapper used to retreieve different emotions based on the number of emotions selected
    if (count === 5) {
      return state.emotionsArr
    }
    if (count === 4) {
      return state.emotionsArr.filter(element => {
        if (element !== 'sad.svg') {
          return element
        }
      })
    }
    if (count === 3) {
      return state.emotionsArr.filter(element => {
        if (element !== 'sad.svg' && element !== 'happy.svg') {
          return element
        }
      })
    }
  },
  getRatings (state) {
    return state.ratings
  },
  getNav (state) {
    return state.nav.filter((e) => {
      return e.id !== 3
    })
  },
  getSumRatings (state) {
    // returning array of 5 elements where each element represents counter for each emoticon
    const ratings = state.ratings
    const series = [0, 0, 0, 0, 0]
    if (ratings !== null) {
      for (let i = 0; i < ratings.length; i++) {
        if (ratings[i].emojiId === 1) {
          series[0]++
        }
        if (ratings[i].emojiId === 2) {
          series[1]++
        }
        if (ratings[i].emojiId === 3) {
          series[2]++
        }
        if (ratings[i].emojiId === 4) {
          series[3]++
        }
        if (ratings[i].emojiId === 5) {
          series[4]++
        }
      }
    }
    return series
  },
  getSumRatingsLine (state) {
    const ratings = state.ratings
    // initialising empty array of arrays.This line chart array has 6 arrays inside.
    // first 5 arrays represent 5 different emoji lists
    // last array represents dates in which ratings happened
    // example lineChart[0][0] and linechart[4][0] both represent number of very happy / very sad ratings at lineChart[5][0] time.
    const lineChart = [
      [],
      [],
      [],
      [],
      [],
      []
    ]
    if (!ratings) {
      // returning empty array if there are no ratings
      return lineChart
    } else {
      // pushing to last (date) array date if the date isn't already in.
      ratings.forEach((elem) => {
        if (lineChart[5].indexOf(elem.date) === -1) {
          lineChart[5].push(elem.date)
        }
      })
      // sorting dates from the oldest to the newest
      // this is done for the case that dates in database aren't already sorted.
      // This can happen if someone manualy changes dates in database.
      lineChart[5].sort(function (a, b) {
        return (a < b) ? -1 : ((a > b) ? 1 : 0)
      })

      // filling linechart with zeroes so we can increment them later.
      for (let i = 0; i < lineChart.length - 1; i++) {
        for (let j = 0; j < lineChart[5].length; j++) {
          lineChart[i][j] = 0
        }
      }
      // for each blok that goes through all ratings
      ratings.forEach((elem) => {
        // for block that goes through all dates stored in linechart
        for (let i = 0; i < lineChart[5].length; i++) {
          // checking if ratings date matches date stored in linechart
          if (elem.date === lineChart[5][i]) {
            // NOTE elem.emojiId-1 represents array in whitch data should be incremented and i represents position inside that array.
            lineChart[elem.emojiId - 1][i]++
          }
        }
      })
      return lineChart
    }
  }
}
