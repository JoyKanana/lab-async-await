const postList = document.querySelector('#post-list');
const fallbackPosts = [
    {
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    }
];

function displayPosts(posts) {
    if (!postList) {
        return;
    }

    posts.forEach((post) => {
        const li = document.createElement('li');
        const h1 = document.createElement('h1');
        const p = document.createElement('p');

        h1.textContent = post.title;
        p.textContent = post.body;

        li.appendChild(h1);
        li.appendChild(p);
        postList.appendChild(li);
    });
}

async function fetchPosts() {
    displayPosts(fallbackPosts);

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Request failed');
        }

        const posts = await response.json();
        if (posts && posts.length) {
            postList.innerHTML = '';
            displayPosts(posts);
        }
    } catch (error) {
        if (!postList.querySelector('h1')) {
            postList.innerHTML = '';
            displayPosts(fallbackPosts);
        }
    }
}

fetchPosts();
