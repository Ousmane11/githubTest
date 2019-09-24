

const githubApi=  axios.create({
    baseURL: 'https://api.github.com/',
  })

//Argumento: input de la barra de búsqueda
const getUserInfo = input => {
    githubApi.get(`users/${input}`)                    
        .then(response => {
          printInfo(response.data)
          
          // Api call that retrieves the repositories of the user and maps each repository to
          // create dom elements to render it
            githubApi.get(`users/${input}/repos`) 
             .then(response => {
               
              // If it existed, Erase repo data from the previous user searched////
              const checkRepos = document.getElementById("eachRepo")
              if (checkRepos.firstElementChild != null) {
                checkRepos.innerHTML=""
              
               }
                  //Renders the repos of the user searched//
                   const repositories = response.data
                  //  console.log(repositories)
                   repositories.map( elm => {

                    const reposDiv = document.getElementById("eachRepo")
                    const div = document.createElement("div")
                    div.setAttribute("class","dom-div")
                    reposDiv.appendChild(div)
                    
                    const repoName = document.createElement("h5")
                    repoName.textContent = `${elm.name}`
                    div.appendChild(repoName)

                    const starIcon = document.createElement("img")
                    starIcon.setAttribute("src","star.svg")
                    starIcon.setAttribute("class","icon1")
                    div.appendChild(starIcon)
                   
                    const stargazers = document.createElement("p")
                    stargazers.setAttribute("class","pTwo")
                    stargazers.textContent = `${elm.stargazers_count}`
                    div.appendChild(stargazers) 
                    
                    const forkIcon = document.createElement("img")
                    forkIcon.setAttribute("src","repo-forked.svg")
                    forkIcon.setAttribute("class","icon2")
                    div.appendChild(forkIcon)

                    const forks = document.createElement("p")
                    forks.setAttribute("class","pOne")
                    forks.textContent = `${elm.forks}`
                    div.appendChild(forks)

                    const line = document.createElement("hr")
                    line.setAttribute("class","thin-hr")
                    reposDiv.appendChild(line) 
             })
            })
          
             .catch(err => {
               console.log('There was an error in repos: ', err)
             })
        })
        .catch(err => {
          console.log('There was an error: ', err)
          
          const errorMessage = document.getElementById("errorDiv")
          if (!errorMessage) {

          const error = document.createElement("div")
          error.setAttribute("id","errorDiv")
          const searchBox = document.getElementsByClassName("searchBox")[0]
          searchBox.appendChild(error)

         const errorText = document.createElement("p")
         errorText.innerText = "Does not exist"
         error.appendChild(errorText)
          }
          
        })
      }
      
        
//DOM elements with data brought from the API
const printInfo = data => {
    // console.log(data)
    const errorMessage = document.getElementById("errorDiv")
          if (errorMessage) {
            errorMessage.parentNode.removeChild(errorMessage)
          }

          ////// If there is already user data rendered: ///////////
    const check= document.getElementById("avatar")
        
          if (check.hasAttribute("src")) {
            const errorMessage = document.getElementById("errorDiv")
              if (errorMessage) {
                errorMessage.parentNode.removeChild(errorMessage)
              }
          
            const info = document.getElementsByClassName("info")[0]
              

            const avatar = document.getElementById("avatar")
            avatar.setAttribute("src",`${data.avatar_url}`)
        
            const username = document.getElementById("pUsername")
            username.textContent = `@${data.login}`
        
            const bio = document.getElementById("pBio")
            bio.textContent = `${data.bio}`
            
          
            info.appendChild(username)
            info.appendChild(bio)

          } else {
                    
            const dom = document.getElementsByClassName("dom")[0]
            dom.setAttribute("class","block")
          
              const info = document.getElementsByClassName("info")[0]
              
          
              const avatar = document.getElementById("avatar")
              avatar.src = `${data.avatar_url}`
          
              const username = document.createElement("p")
              username.setAttribute("id","pUsername")
              username.innerText = `@${data.login}`
          
              const bio = document.createElement("p")
              bio.setAttribute("id","pBio")
              bio.innerText = `${data.bio}`
              
            
             info.appendChild(username)
             info.appendChild(bio)
          }
}



// Function to store the input value
let bringInfo =  () => {
const input = document.getElementById("username").value
// console.log(input)
getUserInfo(input)

}

