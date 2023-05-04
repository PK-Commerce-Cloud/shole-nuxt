<script setup lang="ts">
const {
  products,
  getFullProducts,
  checkout,
  updateShippingAddress,
  addPaymentInstrument,
  createOrder,
  basket,
  updateBillingAddress,
} = useBasket();
const { format } = useCurrency();
await getFullProducts();

const form = ref({
  shippingInfo: {},
});

const step = ref(1);

const fullProduct = computed(() => (productId) => {
  return products.value?.data?.find((p) => p.id === productId);
});

const handleCustomer = async (e) => {
  e.preventDefault();

  step.value = 2;
};

const handleShippingInfo = async (e) => {
  e.preventDefault();

  const payload = {
    shipmentId: "me",
    shipmentNo: "ignored shipment no",
    shippingMethod: {
      id: "001",
    },
    shippingAddress: {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      ...form.value.shippingInfo,
    },
  };

  const r = await updateShippingAddress(payload);
  const b = await updateBillingAddress({
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    ...form.value.shippingInfo,
  });

  console.log(b, payload);

  step.value = 3;
  console.log(e);
};

const handleShippingMethod = (e) => {
  e.preventDefault();
  step.value = 4;
  console.log(e);
};

const handlePayment = async (e) => {
  e.preventDefault();

  const payload = {
    paymentMethodId: "CREDIT_CARD",
    paymentCard: {
      maskedNumber: "**** **** **** 1111".replace(/ /g, ""),
      cardType: "Visa",
      expirationMonth: 12,
      expirationYear: 2024,

      // TODO: These fields are required for saving the card to the customer's
      // account. Im not sure what they are for or how to get them, so for now
      // we're just passing some values to make it work. Need to investigate.
      issueNumber: "",
      validFromMonth: 1,
      validFromYear: 2020,
    },
  };

  await addPaymentInstrument(payload);

  console.log(e);
};

const handleOrder = async () => {
  await createOrder();
};
</script>

<template>
  <div class="bg-white">
    <button @click="handleOrder">Create</button>
    <div class="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
      <div
        class="py-10 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"
      >
        <!-- Customer information -->
        <form v-show="step >= 1" @submit="handleCustomer">
          <!-- Description and details -->
          <div>
            <h2 class="text-lg font-medium text-gray-900">
              Contact information
            </h2>

            <div class="mt-4">
              <label class="block text-sm font-medium leading-6 text-gray-900"
                >Email</label
              >
              <div class="mt-2">
                <input
                  v-model="form.email"
                  type="mail"
                  class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="mt-4">
              <button
                v-if="step === 1"
                type="submit"
                class="w-full rounded-md bg-blue-700 px-3 py-2 uppercase text-white"
              >
                Continue as guest
              </button>
            </div>
          </div>
        </form>
        <!-- Shipping information -->
        <form v-show="step >= 2" @submit="handleShippingInfo">
          <div class="mt-10 border-t py-10">
            <h2 class="text-lg font-medium text-gray-900">
              Shipping information
            </h2>

            <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              <div class="mt-4">
                <label class="block text-sm font-medium leading-6 text-gray-900"
                  >First Name</label
                >
                <div class="mt-2">
                  <input
                    v-model="form.firstName"
                    name="firstName"
                    type="text"
                    class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div class="mt-4">
                <label class="block text-sm font-medium leading-6 text-gray-900"
                  >Last Lane</label
                >
                <div class="mt-2">
                  <input
                    v-model="form.lastName"
                    name="lastName"
                    type="text"
                    class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="col-span-2">
                <div class="mt-4">
                  <label
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Phone</label
                  >
                  <div class="mt-2">
                    <input
                      v-model="form.phone"
                      name="phone"
                      type="phone"
                      class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div class="mt-4">
                  <label
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Country</label
                  >
                  <div class="mt-2">
                    <input
                      v-model="form.shippingInfo.countryCode"
                      name="country"
                      type="country"
                      class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div class="mt-4">
                  <label
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Address</label
                  >
                  <div class="mt-2">
                    <input
                      v-model="form.shippingInfo.address1"
                      name="adress"
                      type="text"
                      class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div class="mt-4">
                  <label
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >City</label
                  >
                  <div class="mt-2">
                    <input
                      v-model="form.shippingInfo.city"
                      name="city"
                      type="text"
                      class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <label class="block text-sm font-medium leading-6 text-gray-900"
                  >State</label
                >
                <div class="mt-2">
                  <input
                    v-model="form.shippingInfo.stateCode"
                    name="state"
                    type="text"
                    class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div class="mt-4">
                <label class="block text-sm font-medium leading-6 text-gray-900"
                  >Zip Code</label
                >
                <div class="mt-2">
                  <input
                    v-model="form.shippingInfo.postalCode"
                    name="zipCode"
                    type="text"
                    class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <button
              v-if="step === 2"
              type="submit"
              class="w-full rounded-md bg-blue-700 px-3 py-2 uppercase text-white"
            >
              Continue with Shipping method
            </button>
          </div>
        </form>

        <!-- Shipping method -->
        <form v-show="step >= 3" @submit="handleShippingMethod">
          <div class="mt-10 border-t py-10">
            <h2 class="text-lg font-medium text-gray-900">
              Shipping information
            </h2>
            <ShippingMethods v-model="form.shippingMethod" class="mt-4" />
          </div>
          <div class="mt-4">
            <button
              v-if="step === 3"
              type="submit"
              class="w-full rounded-md bg-blue-700 px-3 py-2 uppercase text-white"
            >
              Continue with payment
            </button>
          </div>
        </form>

        <form v-show="step >= 4" @submit="handlePayment">
          <div class="mt-10 border-t py-10">
            <h2 class="text-lg font-medium text-gray-900">
              Payment information
            </h2>
            <Payments v-model="form.card"></Payments>
          </div>
          <button
            v-if="step === 4"
            type="submit"
            class="w-full rounded-md bg-blue-700 px-3 py-2 uppercase text-white"
          >
            Review order
          </button>
        </form>
        <div class="mt-10 border-t py-10">
          <!-- <button
              type="submit"
              class="w-full rounded-md bg-blue-700 px-3 py-2 uppercase text-white"
            >
              Review Order
            </button> -->
        </div>
      </div>

      <!-- Order Summary -->
      <div class="pt-6">
        <div>
          <h2 class="text-lg font-medium text-gray-900">Contact information</h2>
          <div class="mt-4 rounded border bg-slate-50 p-6">
            <ul role="list" class="-my-6 divide-y divide-gray-200">
              <li
                v-for="product in basket?.productItems"
                :key="product.productId"
                class="flex py-6"
              >
                <ProductLineItem
                  :product="fullProduct(product.productId)"
                  :product-line-item="product"
                ></ProductLineItem>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-10 border-t py-4">
          <div class="flex justify-between text-sm text-gray-700">
            <label> Subtotal </label>
            <span class="font-medium">{{
              format(basket.productSubTotal)
            }}</span>
          </div>
          <div class="mt-4 flex justify-between text-sm text-gray-700">
            <label>Shipping</label>
            <span class="font-medium">Free</span>
          </div>
          <div class="mt-4 flex justify-between text-sm text-gray-700">
            <label>Taxes</label>
            <span class="font-medium">{{
              format(basket.merchandizeTotalTax)
            }}</span>
          </div>
          <div class="mt-4 flex justify-between border-t py-4 font-medium">
            <label>Total</label>
            <span>{{ format(basket.productTotal) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
