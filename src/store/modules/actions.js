export default {
  setRatings (context, data) {
    console.log('akcija', data)
    let i = 0
    const series = [0, 0, 0, 0, 0]
    for (i = 0; i < data.length; i++) {
      if (data[i].emojiId.id === 1) {
        series[0]++
      }
      if (data[i].emojiId.id === 2) {
        series[1]++
      }
      if (data[i].emojiId.id === 3) {
        series[2]++
      }
      if (data[i].emojiId.id === 4) {
        series[3]++
      }
      if (data[i].emojiId.id === 5) {
        series[4]++
      }
    }
    context.commit('setRatings', series)
  }
}
