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
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URLs defined', () => {
            allFeeds.forEach((item) => {
                expect(item.url).toBeDefined();
                expect(item.url).not.toBe('');
            });
         });


         /*Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names defined', () => {
            allFeeds.forEach((item) => {
                expect(item.name).toBeDefined();
                expect(item.name).not.toBe('');
            });
         });
    });

    describe('The menu', () => {
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         const body = document.querySelector('body');

         it('is hidden by default', () => {
              expect(body.classList.contains('menu-hidden')).toBe(true);
         });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('hides or reveals on click', () => {
              const menuIcon = document.querySelector('.menu-icon-link');

              menuIcon.click();
              expect(body.classList.contains('menu-hidden')).not.toBe(true);

              menuIcon.click();
              expect(body.classList.contains('menu-hidden')).toBe(true);

          });
    });

    describe('Initial Entries', () => {

        // Make sure that test runs after asynchronous loadFeed function
        beforeEach((done) => {
           loadFeed(0, done);
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         it('there is at least one entry in the feed container', () => {
            // Select all entry elements in HTML
            const entries = document.querySelectorAll('.entry')
            expect(entries.length > 0).toBe(true);
         });
    });

    describe('New Feed Selection', () => {

        let oldFeed, newFeed;
        // Grab old feed entries
        beforeEach((done) => {
           loadFeed(0, () => {
              oldFeed = document.querySelector('.feed').innerHTML;
              done();
           });
        });
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * LoadFeed() is asynchronous.
        */
         it('loads new content', (done) => {
            loadFeed(1, () => {
                newFeed = document.querySelector('.feed').innerHTML;
                expect(oldFeed).not.toBe(newFeed);
                done();
            });
         });

         //If I put it like this, it doesn't load tests on the page at all. WHY?
         /*
            describe('Initial Entries', () => {
                let oldFeed, newFeed;
                beforeEach((done) => {
                    loadFeed(0, () => {
                        oldFeed = document.querySelector('.feed').innerHTML;
                            loadFeed(1, () => {
                                newFeed = document.querySelector('.feed').innerHTML;
                            });
                        done();
                    });
                });
                it('loads new content', () => {
                    expect(oldFeed).not.toEqual(newFeed);

                });
            });
          */

    });
}());
