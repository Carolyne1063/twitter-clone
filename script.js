const usersSelect = document.getElementById("users");
const container = document.querySelector(".container");
let users = document.querySelector('.users');
const posts = document.querySelector(".posts");
const commentsWrapper = document.querySelector(".comments-wrapper");
const nameUser = document.getElementsByTagName("h1");
const userName = document.getElementsByTagName("p");
const website = document.getElementsByTagName("p");
const city = document.getElementsByTagName("p");



// Function to fetch users
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => {
        users.forEach(user => {
            const option = document.createElement("option");
            option.value = user.id;
            option.textContent = user.name;
            usersSelect.appendChild(option);

            if (user.id === 1) {
                option.selected = true;
            }

            usersSelect.value = 1;
            usersSelect.dispatchEvent(new Event('change'));


        });
    });

// Function to fetch posts for a specific user
function fetchUserPosts(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json());
}

// Function to fetch comments for a specific post
function fetchPostComments(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json());
}

// Event listener for when a user is selected
usersSelect.addEventListener("change", () => {
    const userId = usersSelect.value;


    users.querySelector(".posts").innerHTML = "";


    fetchUserPosts(userId)
        .then(posts => {
            posts.forEach(post => {
                const postDiv = document.createElement("div");
                // postDiv.className = 'postCard';
                postDiv.classList.add("post");
                postDiv.innerHTML = `
                <div class="card">
                <div class="image">
                <img style="width: 100px; height: 100px; margin-right:10px;" src="${'https://sb.kaleidousercontent.com/67418/1672x1018/6463a5af0d/screenshot-2022-05-24-at-15-22-28.png'}" alt="Profile Image">
                </div>
                <div class="postContents">
                <div class="top">
                <img style="width: 30px; height: 20px;" src="https://twitter-signals-7iou.vercel.app/assets/verify.png">
                <img style="width: 30px; height: 20px;" src="https://twitter-signals-7iou.vercel.app/assets/twitter.png">
                </div>
                <div class="body">
                <p>${post.body}</p>
                </div>
                <div class="footer">
                <img style="width: 30px; height: 20px;" src="https://twitter-signals-7iou.vercel.app/assets/message.png">
                <img style="width: 30px; height: 20px;" src="https://twitter-signals-7iou.vercel.app/assets/retweet.png">
                <img style="width: 30px; height: 20px;" src="https://twitter-signals-7iou.vercel.app/assets/heart.png">
                </div>
                <div class="comments"></div>
                </div>
                </div>
            `;
                users.querySelector(".posts").appendChild(postDiv);


                postDiv.addEventListener('click', () => {

                    if (commentsWrapper.body.style.background == 'none') {
                        commentsWrapper.body.style.background = 'block'
                    } else {
                        commentsWrapper.body.style.background = 'none'
                    }
                })




                fetchPostComments(post.id)
                    .then(comments => {
                        const commentsDiv = postDiv.querySelector(".comments");
                        comments.forEach(comment => {
                            const commentDiv = document.createElement("div");
                            commentDiv.classList.add("comment");
                            commentDiv.innerHTML = `
                        <p><strong>${comment.name}</strong>: ${comment.body}</p>
                    `;
                             commentsWrapper.appendChild(commentDiv);
                            
                        });
                    });


            });
        });
});










