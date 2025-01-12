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
      $orderDate.setAttribute("style", `text-align: right; margin-top: -30px;`);

      const orderDateTime = order.order_datetime;
      const orderDateTimeSplit = orderDateTime.split(" ");
      const orderDate = orderDateTimeSplit[0];
      const orderTime = orderDateTimeSplit[1];

      // The date comes in a YYYY/MM/DD format, so we reverse it
      // and shorten the year to two digits
      const orderDateText = orderDate
        .split("-")
        .reverse()
        .join("/")
        .replace(/(\d{2})(\d)/g, "$2");

      $orderDate.innerHTML = `${orderDateText}<br />${orderTime}`;
      $orderPrice.insertAdjacentElement("afterend", $orderDate);
    });
  };

  popuplateData();
})();
