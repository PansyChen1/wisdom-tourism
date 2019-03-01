import {onThemeChange} from "./theme";
import {onRefreshPopular, onLoadMorePopular} from "./popular";
import {onRefreshTrending, onLoadMoreTrending} from "./trending";
import {onLoadFavoriteData} from "./favorite";
import {onLoadMoreSearch, onSearch, onSearchCancel} from "./search";

export default {
  onThemeChange,
  onRefreshPopular,
  onLoadMorePopular,

  onRefreshTrending,
  onLoadMoreTrending,

  onLoadFavoriteData,

  onLoadMoreSearch,
  onSearch,
  onSearchCancel,
}