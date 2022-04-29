(async () => {
    // Call on IGN API and store data into myData
    const myData = await (await fetch('https://ign-apis.herokuapp.com/videos')).json()
    // Store data contents in videos for easier access
    const videos = myData.data
    // Access videoDisplay
    const otherVideosDisplay = document.querySelector('.videoDisplay')
    // Set Counters
    let counter = 1
    let current = 1

    console.log(myData)
    // Create Load Button
    const loadButton = document.createElement('button')
    loadButton.id = 'loadButton'
    const breaks = document.createElement('br')
    breaks.id = 'breaks'
    loadButton.textContent = "Load More"
    // Button Functionality
    loadButton.onclick = () => {
        for (let i = 0; i < 4; i++) {
            if (document.getElementById('vid')) {
                document.getElementById('vid').remove()
            }
        }
        document.getElementById('breaks').remove()

        counter += 4
        sideVideos(counter)
    }

    // Side videos creates 4 divs that will store the videos and will allow for clicking capabilites
    const sideVideos = () => {
        let count = 0
        for (let i = counter; i < counter + 4; i++) {
            count = i % 10
            console.log(i)
            const vid = document.createElement('div')
            vid.id = "vid"
            const img = document.createElement('img')
            img.src = videos[count].thumbnails[0].url
            vid.appendChild(img)
            const text = document.createElement('div')
            text.textContent = videos[count].metadata.title
            vid.appendChild(text)
            vid.onclick = () => mainVideo(i)
            otherVideosDisplay.appendChild(breaks)
            otherVideosDisplay.appendChild(vid)
        }
        otherVideosDisplay.appendChild(breaks)
        otherVideosDisplay.appendChild(loadButton)
    }


    // Sets the larger display video
    const mainVideo = (i) => {
        document.getElementById('mainVideo').src = videos[i].assets[1].url
        document.getElementById('mainVideo').poster = videos[i].thumbnails[2].url
        document.getElementById('title').textContent = videos[i].metadata.title
        document.getElementById('description').textContent = videos[i].metadata.description
        document.getElementById('mainVideo').title = videos[i].metadata.title

    }


    function myHandler() {
        mainVideo(current)
        current++

        let count = (counter + 4) % 10
        if (document.getElementById('vid')) {
            document.getElementById('vid').remove()
            const vid = document.createElement('div')
            vid.id = "vid"
            const img = document.createElement('img')
            img.src = videos[count].thumbnails[0].url
            vid.appendChild(img)
            const text = document.createElement('div')
            text.textContent = videos[count].metadata.title
            vid.appendChild(text)
            vid.onclick = () => mainVideo(i)
            otherVideosDisplay.appendChild(breaks)
            otherVideosDisplay.appendChild(vid)
            otherVideosDisplay.appendChild(breaks)
            otherVideosDisplay.appendChild(loadButton)
        }

        counter++
    }

    // Handles autoplay, listens for when video ends
    document.getElementById('mainVideo').addEventListener('ended', myHandler, false)

    // Functions to display videos
    mainVideo(0)
    sideVideos()

})()

