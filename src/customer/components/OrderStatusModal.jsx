

const OrderStatusModal = ({ isOpen, onClose, order }) => {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

    
  const getMembershipIcon = (level) => {
    switch (level) {
      case "basic":
        return <span className="text-yellow-500">🎁</span>;
      case "regular":
        return <span className="text-blue-500">⭐</span>;
      case "loyal":
        return <span className="text-purple-500">👑</span>;
      default:
        return <span className="text-gray-500">👤</span>;
    }
  };

  const getStatusProgress = () => {
    const allStatuses = [
      "ordered",
      "picked_up",
      "processing",
      "completed",
      "ready_delivery",
      "delivered",
    ];
    const index = allStatuses.indexOf(order.status);
    return ((index + 1) / allStatuses.length) * 100;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-brand-dark">
            Detail Pesanan {order.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Order Info */}
          <Card className="border-2 border-brand-light-blue bg-brand-light-blue/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center">
                    <span className="text-white">📦</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark">
                      {order.id}
                    </h3>
                    <p className="text-brand-gray">
                      Dipesan pada {formatDate(order.orderDate)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-brand-blue mb-1">
                    {formatCurrency(order.total)}
                  </div>
                  <Badge
                    className={
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    <span className="mr-1">💳</span>
                    {order.paymentStatus === "paid" ? "Lunas" : "Menunggu"}
                  </Badge>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray">Progress:</span>
                  <span className="font-medium text-brand-dark">
                    {Math.round(getStatusProgress())}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-brand-blue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getStatusProgress()}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customer Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h4 className="font-bold text-brand-dark flex items-center space-x-2">
                  <span>👤</span>
                  <span>Informasi Pelanggan</span>
                </h4>

                <div className="space-y-3">
                  {[
                    ["Nama", order.customerName],
                    ["Telepon", order.phone],
                    ["Email", order.email],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between"
                    >
                      <span className="text-brand-gray">{label}:</span>
                      <span className="font-medium text-brand-dark">{value}</span>
                    </div>
                  ))}

                  <div className="flex items-center justify-between">
                    <span className="text-brand-gray">Membership:</span>
                    <div className="flex items-center space-x-2">
                      {getMembershipIcon(order.membershipLevel)}
                      <span className="font-medium text-brand-dark">
                        {order.membershipLevel.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-start space-x-2">
                      <span className="mt-1">📍</span>
                      <div>
                        <span className="text-brand-gray text-sm">Alamat:</span>
                        <p className="font-medium text-brand-dark">{order.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h4 className="font-bold text-brand-dark flex items-center space-x-2">
                  <span>📦</span>
                  <span>Detail Pesanan</span>
                </h4>

                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-brand-light-gray rounded-lg"
                    >
                      <div>
                        <span className="font-medium text-brand-dark">{item.type}</span>
                        <br />
                        <span className="text-sm text-brand-gray">
                          {item.quantity}
                        </span>
                      </div>
                      <span className="font-bold text-brand-blue">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-brand-blue">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>

                {order.notes && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Catatan:</strong> {order.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-bold text-brand-dark flex items-center space-x-2 mb-6">
                <span>⏱️</span>
                <span>Timeline Pesanan</span>
              </h4>

              <div className="space-y-4">
                {order.timeline.map((event, index) => {
                  const isLast = index === order.timeline.length - 1;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-blue text-white">
                          <span>✓</span>
                        </div>
                        {!isLast && (
                          <div className="w-0.5 h-8 mt-2 bg-brand-blue" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold text-brand-dark">
                            {event.description}
                          </h5>
                          <span className="text-sm text-brand-gray">
                            {formatDate(event.time)}
                          </span>
                        </div>
                        <p className="text-sm text-brand-gray mt-1">
                          Status: {event.status}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {order.status !== "delivered" && (
                  <div className="flex items-start space-x-4 opacity-50">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600">
                        <span>🚚</span>
                      </div>
                    </div>
                    <div className="flex-1 pb-4">
                      <h5 className="font-semibold text-gray-600">
                        {order.status === "ready_delivery"
                          ? "Sedang dalam perjalanan"
                          : "Menunggu pengantaran"}
                      </h5>
                      {order.estimatedDelivery && (
                        <p className="text-sm text-gray-500">
                          Estimasi: {formatDate(order.estimatedDelivery)}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="border-brand-blue text-brand-blue hover:bg-brand-light-blue"
            >
              <span className="mr-2">🖨️</span>
              Cetak Invoice
            </Button>

            <Button
              variant="outline"
              className="border-brand-green text-brand-green hover:bg-brand-light-green"
            >
              <span className="mr-2">📥</span>
              Download PDF
            </Button>

            <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">
              <span className="mr-2">💬</span>
              Hubungi CS
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderStatusModal;