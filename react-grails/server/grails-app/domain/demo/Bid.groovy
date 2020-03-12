package demo

import grails.rest.Resource

@Resource(uri = '/bid')
class Bid {

    String date
    Integer amount

    static belongsTo = [license: License]

    static constraints = {
        license nullable: true
    }
}
