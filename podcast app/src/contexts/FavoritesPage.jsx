import React, { useMemo, useState } from "react";
import useFavorites from "../contexts/FavoritesContext";
import EpisodeCard from "../components/EpisodeCard";
import '../styling/FavoritePage.css'

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const [sortOrder, setSortOrder] = useState("newest");
  const [showFilter, setShowFilter] = useState("all");

  // Group favorites by show
  const grouped = useMemo(() => {
    const groups = {};
    favorites.forEach((ep) => {
      if (!groups[ep.showTitle]) groups[ep.showTitle] = [];
      groups[ep.showTitle].push(ep);
    });
    return groups;
  }, [favorites]);

  // Sort favourites by date added
  const sortedGroups = useMemo(() => {
    const sorted = {};
    Object.entries(grouped).forEach(([show, eps]) => {
      sorted[show] = [...eps].sort((a, b) => {
        const diff =
          new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        return sortOrder === "newest" ? diff : -diff;
      });
    });
    return sorted;
  }, [grouped, sortOrder]);

  // Filter by show if needed
  const shows = Object.keys(sortedGroups);
  const filteredShows =
    showFilter === "all" ? shows : shows.filter((s) => s === showFilter);

  if (favorites.length === 0)
    return (
      <main className="favorites-page empty">
        <h1>Favourite Episodes</h1>
        <p>Your saved episodes from all shows will appear here ❤️</p>
      </main>
    );

  return (
    <main className="favorites-page">
      <header className="favorites-header">
        <h1>Favourite Episodes</h1>
        <p>Your saved episodes from all shows</p>

        <div className="filters">
          <label>
            Sort by:
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest Added</option>
              <option value="oldest">Oldest Added</option>
            </select>
          </label>

          <label>
            Show:
            <select
              value={showFilter}
              onChange={(e) => setShowFilter(e.target.value)}
            >
              <option value="all">All Shows</option>
              {shows.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      {filteredShows.map((show) => (
        <section key={show} className="favourites-group">
          <h2>
            {show}{" "}
            <span className="count">
              ({sortedGroups[show].length}{" "}
              {sortedGroups[show].length === 1 ? "episode" : "episodes"})
            </span>
          </h2>

          <ul className="episode-list">
            {sortedGroups[show].map((ep) => (
              <EpisodeCard
                key={ep.id}
                episode={ep}
                showTitle={ep.showTitle}
                showImage={ep.showImage}
                hidePlayButton={false} // still playable if you want
              />
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
