---

Used https://www.tablesgenerator.com/markdown_tables# to generate the table.

---
# More about selectors

As mentioned in the [README](./README.md), we can use CouchDB queries to query the world state which provides us with the current state of the assets in the network. The query is specified as a JSON object, and the selector parameter within this object defines the criteria used to select the assets to return.

Selectors, themselves, are also JSON objects and are very similar in appearance to MongoDB query documents. The syntax of a basic selector is simply a list of fields and the corresponding values required for those fields. For example, the following selector matches all documents where the "owner" field has the value "MagnetoCorp".

```json
{
    "owner": "MagnetoCorp"
}
```

You can also create a selector that matches a document based on more than one field. The one below shows a selector that matches all documents where "owner" is "MagnetoCorp" and the "issuer" is "Digibank".

```json
{
    "owner": "MagnetoCorp",
    "issuer": "Digibank"
}
```

The following example shows a more complex selector which allows us to specify the values of nested fields or subfields.

```json
{
    "interestedParties": {
        "issuer": "Digibank"
    }
}
```

The same selector can also be defined in a more compact manner by using the "dot" notation as shown below:

```json
{
    "interestedParties.issuer": "Digibank"
}
```

## Operators

Operators are identified by the use of a dollar sign ($) prefix in the name field. 

There are two types of operators:

1. **Combination operators** are used to combine selectors. A combination operator takes a single argument and the argument itself is either another selector, or an array of selectors. The combination operators are `$and`, `$or`, `$not`, `$nor`, `$all`, `$elemMatch`, and `$allMatch`. They are generally applied at the topmost level of selection and are used to combine conditions to create complex selectors.

2. **Condition operators** apply to specific fields and are used to evaluate the value of that field. The condition operators are `$lt`, `$lte`, `$eq`, `$ne`, `$gt`, `$gte`, `$exists`, `$type`, `$in`, `$nin`, `$size`, `$mod` and `$regex`. 

> **NOTE**: In general, whenever you have an operator that takes an argument, that argument can itself be another operator with arguments of its own. This enables us to build up more complex selector expressions. However, only equality operators such as $eq, $gt, $gte, $lt, and $lte (but not $ne) can be used as the basis of a query. You should include at least one of these in a selector.

> **NOTE**: The `$eq` and `$and` operators can be specified implicitly or explicitly. If a selector contains a field with a JSON value, but has no operators explicitly specified in it, it is considered to be an equality condition (`$eq`). Any JSON object that is not the argument to a condition operator is an implicit `$and` operator on each field. All operators, apart from `$eq` and `$and` must be stated explicitly.

The following table gives more explanation and examples for all the different operators.

| Operator | Argument | Rule to match documents | Selector examples | Example explanation |
| - | - | - | - | - |
| $lt | Any JSON | The field is less than the argument. | {<br>&nbsp;&nbsp;"price": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$lt": 3<br>&nbsp;&nbsp;}<br>} | Match documents with `price` less than `3`. |
| $lte | Any JSON | The field is less than or equal to the argument. | {<br>&nbsp;&nbsp;"price": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$lte": 3<br>&nbsp;&nbsp;}<br>} | Match documents with `price` less than or equal to `3`. |
| $eq | Any JSON | The field is equal to the argument. | **EXPLICIT NOTATION:**<br>{<br>&nbsp;&nbsp;"price": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$eq": 3<br>&nbsp;&nbsp;}<br>}<br><br>OR<br><br>**IMPLICIT NOTATION:**<br>{<br>&nbsp;&nbsp;"price": 3<br>} | Match documents with `price` equal to `3`. |
| $ne | Any JSON | The field is not equal to the argument. | {<br>&nbsp;&nbsp;"price": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$ne": 3<br>&nbsp;&nbsp;}<br>} | Match documents with `price` not equal to `3`. |
| $gt | Any JSON | The field is greater than the argument. | {<br>&nbsp;&nbsp;"price": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$gt": 3<br>&nbsp;&nbsp;}<br>} | Match documents with `price` greater than `3`. |
| $gte | Any JSON | The field is greater than or equal to the argument. | {<br>&nbsp;&nbsp;"price": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$gte": 3<br>&nbsp;&nbsp;}<br>} | Match documents with `price` greater than or equal to `3`. |
| $exists | Boolean | Check whether the field exists or not, regardless of its value. | {<br>&nbsp;&nbsp;"price": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$exists": true<br>&nbsp;&nbsp;}<br>} | Match documents that have a field called `price`. |
| $type | String | Check the document field’s type. Valid values are `null`, `boolean`, `number`, `string`, `array`, and `object`. | {<br>&nbsp;&nbsp;"price": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$type": "string"<br>&nbsp;&nbsp;}<br>} | Match documents that have a `price` field which has a "string" type value. |
| $in | Array of JSON values | The document field must have a value that exists in the list provided. | {<br>&nbsp;&nbsp;"price": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$in": [3, 4, 5]<br>&nbsp;&nbsp;}<br>} | Match documents with a `price` value of any one of the values in the list i.e. 3, 4, 5. |
| $nin | Array of JSON values | The document field must have a value that does not exist in the list provided. | {<br>&nbsp;&nbsp;"price": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$nin": [3, 4, 5]<br>&nbsp;&nbsp;}<br>} | Match documents with a `price` value other than the values in the list i.e. 3, 4, 5. |
| $size | Integer | Special condition to match the length of an array field in a document. Non-array fields cannot match this condition. | {<br>&nbsp;&nbsp;"issues": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$size": 5<br>&nbsp;&nbsp;}<br>} | Match documents that have a field `issues` of type **array** and the length of the array is `5`. |
| $mod | [Divisor, Remainder] | Divisor and Remainder are both positive or negative integers. Non-integer values result in a 404. Matches documents where `field % Divisor == Remainder` is true, and only when the document field is an integer. | {<br>&nbsp;&nbsp;"price": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$mod": [3, 1]<br>&nbsp;&nbsp;}<br>} | Match documents that have a field `price` of type **integer** and the value of price divided by 3 returns the remainder 1 (e.g. a price value of 4). |
| $regex | String | A regular expression pattern to match against the document field. Only matches when the field is a string value and matches the supplied regular expression. The matching algorithms are based on the Perl Compatible Regular Expression (PCRE) library. For more information about what is implemented, see the [Erlang Regular Expression](http://erlang.org/doc/man/re.html). | {<br>&nbsp;&nbsp;"owner": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$regex": "^M"<br>&nbsp;&nbsp;}<br>} | Match documents where the value of the `owner` field begins with `M`. |
| $and | Array | Matches if all the selectors in the array match. | **EXPLICIT NOTATION:**<br>{<br>&nbsp;&nbsp;$and: [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"price": 3<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"owner": "MagnetoCorp"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}<br><br>OR<br><br>**IMPLICIT NOTATION:**<br>{<br>&nbsp;&nbsp;"price": 3,<br>&nbsp;&nbsp;"owner": "MagnetoCorp"<br>} | Match documents where the value of the `price` field is `3` **AND** the value of the `owner` field is `MagnetoCorp`. |
| $or | Array | Matches if any of the selectors in the array match. All selectors must use the same index. | {<br>&nbsp;&nbsp;$or: [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"price": 3<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"owner": "MagnetoCorp"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>} | Match documents where the value of the `price` field is `3` **OR** the value of the `owner` field is `MagnetoCorp`. |
| $not | Selector | Matches if the given selector does not match. | {<br>&nbsp;&nbsp;$not: {<br>&nbsp;&nbsp;&nbsp;&nbsp;"owner": "MagnetoCorp"<br>&nbsp;&nbsp;}<br>} | Match documents where the value of the `owner` field is **NOT** `MagnetoCorp`. |
| $nor | Array | Matches if none of the selectors in the array match. | {<br>&nbsp;&nbsp;$and: [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"price": 3<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"owner": "MagnetoCorp"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>} | Match documents where the value of the `price` field is **NOT** `3` **AND** the value of the `owner` field is **NOT** `MagnetoCorp`. |
| $all | Array | Matches an array value if it contains all the elements of the argument array. | {<br>&nbsp;&nbsp;"keywords": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$all": ["Technical","Retail"]<br>&nbsp;&nbsp;}<br>} | Match documents where the field `keywords` is an **array** and contains all the keywords mentioned in the selector i.e. **BOTH** `Technical` and `Retail` are in the `keywords` array of the document. |
| $elemMatch | Selector | Matches and returns all documents that contain an array field with at least one element that matches all the specified query criteria. | {<br>&nbsp;&nbsp;"keywords": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$elemMatch": {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"$eq": "Technical"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>} | Match documents where the field `keywords` is an **array** and at least one element of this array matches the given criteria - that the value of that element is `Technical`. |
| $allMatch | Selector | Matches and returns all documents that contain an array field with all its elements matching all the specified query criteria. | {<br>&nbsp;&nbsp;"keywords": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"$allMatch": {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"$eq": "Technical"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>} | Match documents where the field `keywords` is an **array** and all of the elements of this array match the given criteria - that the value of all the elements is `Technical`. |

For a more detailed explanation, you can refer the section for [Selector Syntax](https://docs.couchdb.org/en/latest/api/database/find.html#selector-syntax) in the CouchDB documentation.