addEventListener('DOMContentLoaded', ()=>{

    const commentList = document.querySelector('.comments');

    function formatTimestamp(unix) {
        const date = new Date(unix * 1000);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }

    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function renderComments(comments) {
        commentList.innerHTML = ''; // clear current comments

        if (comments.length === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.className = 'no-comments';
            emptyMsg.textContent = 'Tidak ada komentar';
            commentList.appendChild(emptyMsg);
            return;
        }

        comments.reverse().forEach(c => {
            const el = document.createElement('div');
            el.className = 'comment';
            el.innerHTML = `
                <p class="comment-meta">
                    <span class="comment-author">${c.name}</span>
                    <span class="comment-time">· ${formatTimestamp(c.timestamp)}</span>
                </p>
                <p class="comment-text">${escapeHTML(c.text).replace(/\n/g, '<br>')}</p>
            `;
            commentList.appendChild(el);
        });
    }



    function fetchComments() {
        fetch('get-comments.php')
            .then(res => res.json())
            .then(renderComments);
    }

    // listen for "Lihat Komentar" button click
    document.querySelectorAll('a[data-info="comment-list"]').forEach(btn => {
        btn.addEventListener('click', e => {
            fetchComments(); // refresh comments list
            const target = document.getElementById('comment-list');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });


    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('fname').value.trim();
        const text = document.getElementById('komentar').value.trim();

        if (name && text) {
            const data = new FormData();
            data.append('name', name);
            data.append('text', text);

            fetch('submit-comment.php', {
                method: 'POST',
                body: data
            })
            .then(res => res.json())
            .then(comments => {
                renderComments(comments);
                document.getElementById('komentar').value = '';

                // scroll to comment list
                const target = document.getElementById('comment-list');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }
    });


    fetchComments(); // load initially
})

