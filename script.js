const usersSelect = document.getElementById("users");
const container = document.querySelector(".container");

// Function to fetch users
fetch("https://jsonplaceholder.typicode.com/users")
.then(response => response.json())
.then(users => {
    users.forEach(user => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        usersSelect.appendChild(option);
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

    // Clear previous content
    container.querySelector(".users").innerHTML = "";

    // Fetch and display user's posts
    fetchUserPosts(userId)
    .then(posts => {
        posts.forEach(post => {
            const postDiv = document.createElement("div");
            postDiv.classList.add("post");
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <img style="width: 100px; height: 100px; margin-right:10px;" src="${'https://sb.kaleidousercontent.com/67418/1672x1018/6463a5af0d/screenshot-2022-05-24-at-15-22-28.png'}" alt="Profile Image">
                <p>${post.body}</p>
                <div class="comments"></div>
            `;
            container.querySelector(".users").appendChild(postDiv);

            // Fetch and display comments for this post
            fetchPostComments(post.id)
            .then(comments => {
                const commentsDiv = postDiv.querySelector(".comments");
                comments.forEach(comment => {
                    const commentDiv = document.createElement("div");
                    commentDiv.classList.add("comment");
                    commentDiv.innerHTML = `
                        <p><strong>${comment.name}</strong>: ${comment.body}</p>
                    `;
                    commentsDiv.appendChild(commentDiv);
                });
            });
        });
    });
});

