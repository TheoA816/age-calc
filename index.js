(() => {

    const day = document.querySelector('#day')
    const month = document.querySelector('#month')
    const year = document.querySelector('#year')

    const form = document.querySelector('form')
    const sep2 = document.querySelector('#line2')

    const submit = (e) => {
        e.preventDefault()

        const data = new FormData(e.target)
        const today = new Date()

        const birthDay = parseInt(data.get('day'))
        if (birthDay > 31 || birthDay < 1) {
            alert('day must be valid')
            return
        }

        const birthMonth = parseInt(data.get('month')) - 1
        if (birthMonth > 12 || birthMonth < 1) {
            alert('month must be valid')
            return
        }

        const birthYear = parseInt(data.get('year'))
        if (birthYear > today.getFullYear()) {
            alert('year is in the future')
        }

        const birthDate = new Date(birthYear, birthMonth, birthDay)
        if (birthDate.getDate() !== birthDay) {
            alert(`date invalid - please double check if it's a correct date`)
            return
        }
        
        let yearsDiff = today.getFullYear() - birthDate.getFullYear();
        let monthsDiff = today.getMonth() - birthDate.getMonth();
        let daysDiff = today.getDate() - birthDate.getDate();
        
        // Adjust the age if the birthday hasn't occurred yet this year
        if (today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() &&
            today.getDate() < birthDate.getDate())
        ) {
            yearsDiff--;
            monthsDiff += 12;
        }

        // Adjust the months if the day of the current month is less than the birth day
        if (daysDiff < 0) {
            monthsDiff--;
            daysDiff += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }

        day.textContent = daysDiff
        month.textContent = monthsDiff
        year.textContent = yearsDiff
    }

    const removeSep = (e) => {
        sep2.hidden = (window.innerWidth >= 600)
    }

    form.addEventListener('submit', submit)
    window.addEventListener('resize', removeSep)
})()