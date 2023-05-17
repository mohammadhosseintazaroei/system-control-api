/**
 * @swagger
 *  tags: 
 *      name: SystemRoutes
 *      description: Back-door for developers
 */



/**
 * @swagger
 *  components:
 *      schemas:
 *          TimeType:
 *              type: object
 *              required:
 *                  -   type
 *              properties:
 *                  type:
 *                      type: string
 *                      enum:
 *                          - hour
 *                          - second
 *                          - minute
 *                      description: Blog title
 */


/**
 * @swagger
 *  /system/shutdown/{timeout}:
 *      post:
 *          tags: [SystemRoutes]
 *          summary: shutdown your system
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: timeout
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /system/shutdown/cancel:
 *      get:
 *          tags: [SystemRoutes]
 *          summary: cancel shutdown
 *          responses:
 *              200:
 *                  description: success
 */


/**
 * @swagger
 *  /system/sleep/{timeout}:
 *      post:
 *          tags: [SystemRoutes]
 *          summary: sleep your system
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: timeout
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /system/sleep/cancel:
 *      get:
 *          tags: [SystemRoutes]
 *          summary: cancel sleep
 *          responses:
 *              200:
 *                  description: success
 */