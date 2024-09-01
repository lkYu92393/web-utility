// const dataSrc = [
//     { title: "Hello", amount: 1999, hidden: 123, startDate: "2011-01-01", endDate: "2012-01-02" },
//     { title: "World", amount: 6548, hidden: 123, startDate: "2012-01-01", endDate: "2012-01-02" },
//     { title: "Mantis", amount: 6135, hidden: 123, startDate: "2014-01-01", endDate: "2012-01-02" },
//     { title: "Gonna", amount: 4134, hidden: 123, startDate: "2016-01-01", endDate: "2012-01-02" },
//     { title: "Mojo", amount: 7245, hidden: 123, startDate: "2018-01-01", endDate: "2012-01-02" },
//     { title: "Cat", amount: 2315, hidden: 123, startDate: "2020-01-01", endDate: "2012-01-02" },
//     { title: "Dog", amount: 2346, hidden: 123, startDate: "2021-01-01", endDate: "2012-01-02" },
// ]

const firstNameList = ['Liam', 'Noah', 'Oliver', 'James', 'Elijah', 'Mateo', 'Theodore', 'Henry', 'Lucas', 'William']
const lastNameList = ['Smith', 'Johnson', 'Brown', 'Jones', 'Miller', 'Davis', 'Martinez', 'Lopez', 'Thomas', 'Moore']
const randomDateGen = (startYear) => {
    const year = (Math.round(Math.random() * 5) + startYear).toString()
    const month = (Math.round(Math.random() * 11) + 1).toString()
    const day = (Math.round(Math.random() * 27) + 1).toString()
    // const date = (year + (month.length == 1 ? '-0' : '-') + month + (day.length == 1 ? '-0':'-') + day)
    const date = year + '-' + month.padStart(2, '0') + '-' + day.padStart(2, '0')
    return date
}

const dataSrcFunc = (noOfRecord) => {
    return Array(noOfRecord).fill().map((_, index) => {
        return {
            id: index,
            firstName: firstNameList[Math.round(Math.random() * (firstNameList.length-1))],
            lastName: lastNameList[Math.round(Math.random() * (lastNameList.length - 1))],
            age: Math.round(Math.random() * 30) + 30,
            salary: (Math.round(Math.random() * 30) + 18) * 1000,
            startDate: randomDateGen(2011),
            endDate: randomDateGen(2017),
        }
    })
}

const titleDict = {
}

let datatableTarget = null


const DOMContentLoadedHandler = () => {
    const convertToDate = (dateStr, format) => {
        switch (format) {
            case 'yyyy-MM-dd':
                const temp = dateStr.split('-')
                return new Date(`${temp[0]}-${temp[1]}-${temp[2]}`)
            default:
                return new Date(dateStr)
        }
    }

    $.extend($.fn.dataTable.ext.type.order, {
        "date-sort-asc": function (val_1, val_2) {
            const temp_1 = convertToDate(val_1, 'yyyy-MM-dd')
            const temp_2 = convertToDate(val_2, 'yyyy-MM-dd')
            return temp_1 > temp_2 ? 1 : -1
        },
        "date-sort-desc": function (val_1, val_2) {
            const temp_1 = convertToDate(val_1, 'yyyy-MM-dd')
            const temp_2 = convertToDate(val_2, 'yyyy-MM-dd')
            return temp_1 > temp_2 ? -1 : 1
        }
    });

    let pageJumpTool = document.createElement('div')
    pageJumpTool.innerHTML = `<label>Jump to page: </label><input id='pageInput' name='pageInput' style='width:50px;' /><input type='button' id='pageJumpButton' value='Go' style='width:50px;' />`

    const datatablePageJumpInputHandler = (ev) => {
        if (ev.keyCode === 13) {
            ev.preventDefault()
            datatablePageJumpButtonHandler()
        }
    }

    const datatablePageJumpButtonHandler = () => {
        let pageNo = parseInt(document.getElementById('pageInput').value);

        if (pageNo > datatableTarget.page.info().pages) {
            alert(`Number is larger than maximum page number. Aborted.`)
            return
        }

        datatableTarget.page(pageNo-1).draw(false);
        document.getElementById('pageInput').value = '';
    }

    let pagingTool = document.createElement('div')
    pagingTool.innerHTML = `<button class='dt-paging-button first' ><<</button>`

    datatableTarget = new DataTable('#example', {
        // layout: {
        //     topStart: 'pageLength',
        //     topEnd: {
        //         'search':{
        //             placeholder: 'Search'
        //         }
        //     },
        //     bottomStart: 'info',
        //     bottomEnd: 'paging'
        // },
        layout: {
            top: {
                features: ['search']
            },
            topStart: 'pageLength',
            topEnd: pageJumpTool,
            bottomStart: 'info',
            bottomEnd: 'paging'
        },
        initComplete: () => {
            document.getElementById('pageInput').addEventListener('keypress', datatablePageJumpInputHandler)
            document.getElementById('pageJumpButton').addEventListener('click', datatablePageJumpButtonHandler)
        },
        data: dataSrcFunc(200),
        columns: [
            { data: 'id', visible: false },
            { data: (row) => { return `${row.firstName} ${row.lastName}` }, width: '30%' },
            { data: 'age' },
            { 
                data: 'salary', render: (data, type) => {
                    const number = DataTable.render.number(',', '.', 2, '$').display(data)
                    return number
            } 
        },
            { data: 'startDate' },
            { data: 'endDate' },
        ],
        columnDefs: [
            { target: [3], className: 'dt-body-right' },
            { target: [4, 5], type: 'date-sort' },
        ],
        scrollCollapse: true,
        scrollY: '400px'
    })
    $.fn.DataTable.ext.pager.numbers_length = 3;
}

document.addEventListener("DOMContentLoaded", DOMContentLoadedHandler)