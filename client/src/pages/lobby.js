function lobbyPage() {
    return (
    <div>
        {/* Added navbar links, Rules page redirect to home page, are we having home page 
        to show rules? */}
        <nav class="navbar navbar-dark bg-dark navbar-expand-lg justify-content-between">
            <a class="navbar-brand" href="/">Group Out of Town - Speed</a>

            <div class="collapse navbar-collapse justify-content-end">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/">Rules</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Top Score</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Logout</a>
                </li>
                </ul>
            </div>
        </nav>
        This is lobby page
    </div>
)}

export default lobbyPage;
