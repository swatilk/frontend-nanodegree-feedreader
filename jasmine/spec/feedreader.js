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
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         var feedItem;
         function test(feed){
            return feed;
         }
         it(' have defined and non empty URLs', function(){
            allFeeds.forEach(function(feed){
                feedItem = test(feed);
                expect(feedItem.url).toBeDefined();
                expect(feedItem.url).not.toBe("");
            });

         });



         /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

            it('have defined and non empty names', function(){
                allFeeds.forEach(function(feed){
                    feedItem = test(feed);
                });
                expect(feedItem.name).toBeDefined();
                expect(feedItem.name).not.toBe("");
            });
    });


    /*  A new test suite named "The menu" */

    describe('The menu', function() {
        var body = $('body'),
            menuIcon = $('.menu-icon-link'),
            menuPanel = $('.feed-list');

         /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it(' is hidden by default', function(){
            expect(body).toHaveClass('menu-hidden');
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it(' changes visibility when the menu icon is clicked', function(){
            menuIcon.click();
            expect(body).not.toHaveClass('menu-hidden');

            menuIcon.click();
            expect(body).toHaveClass('menu-hidden');
        });

        /* Test that ensures the menu hides when an element
         * from the feed-list is chosen
         */

        it(' hides when clicked on a menu-item', function(){
            var spyEvent = spyOnEvent(menuPanel.children('li'), 'click');
            menuPanel.children('li').click();
            expect(spyEvent).toHaveBeenTriggered();
            expect(body).toHaveClass('menu-hidden');
         });

    });



    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
       /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */


         beforeEach(function(done){
            loadFeed(0, done);
         });

         var feed = $('.feed');
         it(' has atleast one entry element', function(){
            expect(feed[0].children[0].children[0]).toBeDefined();
            expect(feed[0].children[0].children[0]).toHaveClass('entry');
         });
    });


    /* A new test suite named "New Feed Selection"

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        describe('New Feed Selection', function(){
            var feed_one, feed_two;
            beforeEach(function(done){
                $('.feed').empty();
                loadFeed(1, function(){
                    feed_one = $('.feed').find('h2').text();
                    done();
                });

            });
            it(' actually changes the content', function(done){
                $('.feed').empty();
                loadFeed(0, function(){
                    feed_two = $('.feed').find('h2').text();
                    console.log(feed_one);
                    console.log(feed_two);
                    expect(feed_one).not.toEqual("");
                    expect(feed_two).not.toEqual("");
                    expect(feed_one).not.toEqual(feed_two);
                    done();
                });

            });
        });
}());
