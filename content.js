(function () {
  const fetchData = async () => {
    return fetch("https://godzila.bg/api2/get_profile")
      .then((response) => response.json())
      .then((data) => {
        return data.orders;
      });
  };

  const popuplateData = async () => {
    const ordersData = await fetchData();

    if (0 === ordersData.length) {
      return;
    }

    const $orders = document.querySelectorAll(".prev-order-item");

    ordersData.forEach((order, index) => {
      const orderDate = order.order_datetime;
      const $orderItem = $orders[index];
      const $orderPrice = $orderItem.querySelector(
        ".prev-order-item__price.text-lg-end"
      );

      const orderDateId = `order-date-${index}`;

      const $existingOrderDate = document.getElementById(orderDateId);
      if ($existingOrderDate) {
        $existingOrderDate.remove();
      }

      const $orderDate = document.createElement("p");
      $orderDate.setAttribute("id", orderDateId);
      $orderDate.setAttribute(
        "style",
        `text-align: right; margin-top: -50px; font-weight: semibold;`
      );

      $orderDate.textContent = `${orderDate.replace(/-/g, "/")}`;
      $orderPrice.insertAdjacentElement("afterend", $orderDate);
    });
  };

  popuplateData();
})();
