/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * "allFeeds" variable has been defined and that it is not
         * empty.
         * It does so by checking if "allFeeds" is defined and
         * if its lenght is grater than 0.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in
         * the "allFeeds" object and ensures it has a URL defined
         * and that the URL is not empty.
         * It uses a for loop and iterates through all of elements
         * of the "allFeeds" array testing if the url property
         * of each item within "allFeeds" is defined and have length
         * greater than 0 (not empty).
         */

        it("has URL defined", function () {
            for (feed in allFeeds){
                expect(allFeeds[feed].url).toBeDefined();
                expect(allFeeds[feed].url.length).not.toBe(0);
            }
        });

        /* This test loops through each feed
         * in the "allFeeds" object and ensures it has a name defined
         * and that the name is not empty.
         * It has a similar setup to the previous test.
         */

        it("has name defined", function () {
            for (feed in allFeeds){
                expect(allFeeds[feed].name).toBeDefined();
                expect(allFeeds[feed].name.length).not.toBe(0);
            }
        });
    
    });


    /* Suite for testing the functionalites of the menu */
    describe("The menu", function() {
    
        /* This test ensures the menu element is
         * hidden by default.
         * It does so by cheching if the "body" of the HTML
         * contains the class named "menu-hidden" that makes the
         * menu disappear from sight via CSS
         */
        var body = document.body

        it("is initially hidden", function () {
            expect(body.getAttribute("class")).toContain("menu-hidden");
        });
        
         /* This test ensures the menu changes
          * visibility when the menu icon is clicked.
          * This test have two expectations: does the menu display
          * when clicked and does it hide when clicked again.
          * It uses "beforeEach" to simulate clicking before each test
          * It first checks if after the first click
          * if the body lost its "menu-hidden" class
          * Then after the second click it checks if the body
          * contains the class "menu-hidden" again.
          */
        
        describe("when the button is clicked", function() {

            beforeEach( function(){
                $(".menu-icon-link").click();
            });

            it("at first, it is visible", function () {
                expect(body.getAttribute("class")).not.toContain("menu-hidden");
            });

            it("then it is invisible again", function () {
               expect(body.getAttribute("class")).toContain("menu-hidden");
            });

        });
    
    });

    /* Suite that tests the functionality of the loadFeed function */
    describe("Initial Entries", function() {

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * This test uses "beforeEach" and "done" to make sure that
         * the asynchronous "loadFeed" function finished loading.
         * After that it tests if the feed container has any elements
         * by checking the length of its children. 
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it("are in their container", function (done) {
           expect($(".feed").children().length).not.toBe(0);
           done();
        });

    });

    /* Suite that tests the functionalities of the app when a new feed is loaded */
    describe("New Feed Selection", function() {

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * It uses "beforeEach" (and "done") to make sure that
         * the asynchronous "loadFeed" function finished loading,
         * it registers the initial content of the feed container
         * and loads the second feed in the "allFeeds" array.
         * Then it compares the initial content (first element of
         * the "allFeeds" array) with the new one (second element of
         * the "allFeeds" array). The test expects them to have
         * different content.
         * After the test run, the "afterEach" function makes sure
         * that the first element of the "allFeeds" array is loaded again.
         * The app is ready to use.
         */
        var initialContent;

        beforeEach(function(done) {
            initialContent = $(".feed");
            loadFeed(1, done);
        });

        it("loads new feed properly", function (done) {
            expect($(".feed")).not.toBe(initialContent);
            done();
        });

        afterEach(function(done) {
            loadFeed(0, done);
        });

    });
}());
