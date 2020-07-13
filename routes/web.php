<?php

Route::get("/watchlist", "watchlist\WatchList@index");
Route::get("/data", "watchlist\WatchList@store");
Route::get("/addAsoc", "watchlist\WatchList@addAssoc");
Route::get("/reloadtabw", "watchlist\WatchList@reloadTab");
Route::get("/delAsoc", "watchlist\WatchList@delAsoc");
Route::get("/saveTableConf", "watchlist\WatchList@saveTableConfig");
Route::get("/loadInitConf", "watchlist\WatchList@initTableConfig");
