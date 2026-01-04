import { defineArrayMember, defineField, defineType } from "sanity";

export const cartType = defineType({
	name: "cart",
	title: "Cart",
	type: "document",
	fields: [
		defineField({
			name: "clerkUserId",
			title: "Clerk User Id",
			type: "string",
		}),
		defineField({
			name: "items",
			title: "Cart Items",
			type: "array",
			validation: (Rule) => Rule.required(),
			of: [
				defineArrayMember({
					type: "object",
					fields: [
						defineField({
							name: "product",
							title: "Product",
							type: "reference",
							to: [{type: "product"}],
							validation: (Rule) => Rule.required(),
						}),
						defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
							validation: (Rule) => Rule.required(),
            }),
					]
				})
			]
		}),
	]
})