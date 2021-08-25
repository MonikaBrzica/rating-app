<template>
  <div class="table">
    <table>
      <thead>
      <tr>
        <th @click="sortBy('id')">Emoticon
          <img src="../assets/images/caret-down-solid.svg"
               alt="drop-down">
        </th>
        <th @click="sortBy('count')">Count
          <img src="../assets/images/caret-down-solid.svg"
               alt="drop-down">
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in this.sortedItems"
          v-bind:key="item.name"
          v-show="item.count != 0">
        <td>{{item.name}}</td>
        <td>{{ item.count}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Table',
  data: function () {
    return {
      sort: {
        key: '',
        isAsc: false
      },
      tableData: [
        {
          id: 1,
          name: 'Very happy',
          count: 0
        },
        {
          id: 2,
          name: 'Happy',
          count: 0
        },
        {
          id: 3,
          name: 'Meh',
          count: 0
        },
        {
          id: 4,
          name: 'Sad',
          count: 0
        },
        {
          id: 5,
          name: 'Very sad',
          count: 0
        }
      ]
    }
  },
  computed: {
    sortedItems () {
      // sorting table data by id and count eather ascending or descending
      const list = this.tableData.slice()
      for (let i = 0; i < list.length; i++) {
        list[i].count = this.$store.getters.getSumRatings[i]
      }
      if (this.sort.key) {
        list.sort((a, b) => {
          a = a[this.sort.key]
          b = b[this.sort.key]
          return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
        })
      }
      return list
    }
  },
  methods: {
    sortBy (key) {
      this.sort.isAsc = (this.sort.key === key) ? !this.sort.isAsc : false
      this.sort.key = key
    }
  }
}
</script>
<style lang="scss" scoped>
.table {
  width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.85);
  table {
    border-collapse: collapse;
    border-style: hidden;
  }
  table tr:last-child td:first-child {
    border-bottom-left-radius: 4px;
  }
  table tr:last-child td:last-child {
    border-bottom-right-radius: 4px;
  }
  table tr:first-child th:first-child {
    border-top-left-radius: 4px;
  }
  table tr:first-child th:last-child {
    border-top-right-radius: 4px;
  }
  tr {
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: rgb(62, 65, 72);
  }
    th {
      font-size: 14px;
      padding-left: 20px;
      text-align: left;
      width: 354px;
      height: 47px;
      background-color: rgb(62, 65, 72);

      img {
        width: 24px;
        height: 24px;
        padding-top: 6px;
        padding-left: 6px;
      }
    }
    td {
      font-size: 14px;
      padding-left: 20px;
      width: 354px;
      background-color: rgb(45, 48, 56);
      height: 48px;
    }
  }
</style>
